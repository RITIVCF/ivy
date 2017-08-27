import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class NewEventModal extends TrackerReact(React.Component) {
  constructor(){
    super();

    this.state = {
      start: new moment(),
      createdisabled: false
    }
  }

  componentDidMount(){
    $('.modal').modal();
  }

  open(){
    $('#neweventmodal').appendTo("body").modal('open');
    this.refs.newname.focus();
  }

  setStart(start){
    this.setState({start: start});
  }

  createNew(go){
    event.preventDefault();
    if(this.refs.newname.value==""){
      Materialize.toast("Please enter an event name.", 4000);
      return;
    }
    Meteor.call('addEvent', this.refs.newname.value, newevent.start._d, function(error, result){
      if(error){
        console.error(error.reason);
        return;
      }
      if(go){
        FlowRouter.go("/events/workspace/"+result);
      }
      $('#neweventmodal').modal('close');
    });
    this.refs.newname.value="New Event";
}

  checkValue(event){
    if(event.target.value==""){
      this.setState({createdisabled: true});
      return;
    }
    this.setState({createdisabled: false});

  }

  render() {
    return (
      <div id="neweventmodal" className="modal bottom-sheet">
        <div className="modal-content">
          <div className="row">
            <div className="input-field col s12">
              <input ref="newname" id="newname" type="text" onChange={this.checkValue.bind(this)} defaultValue={"New Event"} />
              <label htmlFor="icon_prefix">New Event Name</label>
            </div>
            <div className="col s12">
              <p>Start: {this.state.start.format("Do MMM h:mmA")}</p>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <a onClick={this.createNew.bind(this,false)} ref="createevent"
            className={this.state.createdisabled?"modal-action waves-effect waves-green btn-flat disabled":
						"modal-action waves-effect waves-green btn-flat"}>Create
          </a>
          <a onClick={this.createNew.bind(this,true)} ref="editevent"
            className={this.state.createdisabled?"modal-action modal-close waves-effect waves-green btn-flat disabled":
						"modal-action modal-close waves-effect waves-green btn-flat"}>Edit Event
          </a>
          <a className="modal-action modal-close waves-effect waves-light btn-flat" >Cancel</a>
        </div>
      </div>
    )
  }
}
