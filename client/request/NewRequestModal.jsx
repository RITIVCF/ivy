import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class NewRequestModal extends TrackerReact(React.Component) {

  componentDidMount(){
    $('.modal').modal();
    $('select').material_select();
  }

  open(){
    $("#newrequestmodal").appendTo("body").modal("open");
  }

  getTypes(){
    return Options.findOne("requesttypes").vals;
  }

  submit(event){
    event.preventDefault();
    if(this.refs.reqtype.value==""){
      Materialize.toast("Please select a valid type.", 4000);
      return;
    }
    $("#newrequestmodal").modal("close");
    var sub = this.refs.reqsubj.value.trim();
    var desc = this.refs.reqdesc.value.trim();
    var typ = this.refs.reqtype.value.trim();
    // console.log("Sub: ", sub);
    // console.log("Desc: ", desc);
    // console.log("Type: ", typ);
    // console.log("Type Again: ", this.refs.reqtype.value.trim());
    // console.log("Event ID", this.props.eid);
    Meteor.call("addEventRequest",
      sub,   // subject
      desc,  // description
      "",    // assigned group
      "",    // assigned user
      Meteor.userId(),   // Customer
      this.props.eid,    // event Id
      typ);    // request type
    //Reset Form
    this.refs.reqsubj.value="";
    this.refs.reqdesc.value="";
    this.refs.reqtype.value="";
    Materialize.updateTextFields();
    $('select').material_select('destroy');
    $('select').material_select();
    Materialize.toast("Submission succesful.", 4000);
  }

  render() {
    return (
      <div id="newrequestmodal" className="modal modal-fixed-footer">
        <form ref="form" onSubmit={this.submit.bind(this)}>
          <div className="modal-content">
            <div className="row">
              <h4>New Event Request</h4>
                <div className="input-field col s12 m8 l6">
                  <input type="text" id="reqsubj" name="reqsubj" ref="reqsubj" required />
                  <label htmlFor="reqsubj">Subject</label>
                </div>
                <div className="input-field col s12">
                  <textarea className="materialize-textarea" id="reqdesc" name="reqdesc" ref="reqdesc" required />
                  <label htmlFor="reqdesc">Description*</label>
                </div>
                <div className="input-field col s12 m8 l6">
                  <select ref="reqtype" value="" >
                    <option value="" disabled >Select Type</option>
                    {this.getTypes().map((type)=>{
                      return <option key={type.label} value={type.label}>{type.label}</option>
                    })}
                  </select>
                  <label>Request Type</label>
                </div>

            </div>
            <p>*For <b>Resource</b> request, please include estimated prices and where it is being bought. Any extra information is helpful.<br/>
                For <b>Design</b> request, please provide a need by date that is no less than two weeks away.<br/></p>
          </div>
          <div className="modal-footer">
            <button className="waves-effect waves-light btn">Submit</button>
            <a className="modal-action modal-close waves-effect waves-light btn-flat">Close</a>
          </div>
        </form>
      </div>
    )
  }
}
