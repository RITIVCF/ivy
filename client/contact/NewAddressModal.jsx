import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class NewAddressModal extends TrackerReact(React.Component) {
  constructor(){
    super();

    this.state = {
      createdisabled: true
    }

  }

  componentDidMount(){
    $('.modal').modal();
  }

  createNew(go){
    event.preventDefault();
    Meteor.call('addMailingAddress', this.props.contact._id, function(error, result){
      if(error){
        console.log(error.reason);
        return;
      }
      $('#newaddressmodal').modal('close');
    });
    this.refs.line1.value="";
    this.refs.line2.value="";
    this.refs.line3.value="";
    this.refs.city.value="";
    this.refs.state.value="";
    this.refs.zip.value="";
}

  checkValue(event){
    console.log(this.refs);
    if(this.refs.line1.value==""||
        this.refs.city.value==""||
        this.refs.state.value==""||
        this.refs.line1.value==""){
      this.setState({createdisabled: true});
      return;
    }
    this.setState({createdisabled: false});

  }

  render() {
    return (
      <div id="newaddressmodal" className="modal">
        <div className="modal-content">
          <div className="input-field col s12">
            <input ref="line1" id="line1" type="text" onChange={this.checkValue.bind(this)}  />
            <label htmlFor="icon_prefix">Line 1</label>
          </div>
          <div className="input-field col s6">
            <input ref="line2" id="line2" type="text" onChange={this.checkValue.bind(this)} />
            <label htmlFor="icon_prefix">Line 2</label>
          </div>
          <div className="input-field col s6">
            <input ref="line3" id="line3" type="text" onChange={this.checkValue.bind(this)}  />
            <label htmlFor="icon_prefix">Line 3</label>
          </div>
          <div className="input-field col s4">
            <input ref="city" id="city" type="text" onChange={this.checkValue.bind(this)}  />
            <label htmlFor="icon_prefix">City</label>
          </div>
          <div className="input-field col s4">
            <input ref="state" id="state" type="text" onChange={this.checkValue.bind(this)}  />
            <label htmlFor="icon_prefix">State</label>
          </div>
          <div className="input-field col s4">
            <input ref="zip" id="zip" type="text" onChange={this.checkValue.bind(this)}  />
            <label htmlFor="icon_prefix">ZIP</label>
          </div>
        </div>
        <div className="modal-footer">
          <a onClick={this.createNew.bind(this,false)} ref="createevent"
            className={this.state.createdisabled?"modal-action waves-effect waves-green btn-flat disabled":
              "modal-action waves-effect waves-green btn-flat"}>Create
          </a>
        </div>
      </div>
    )
  }
}
