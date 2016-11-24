import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class NewEventModal extends TrackerReact(React.Component) {
  constructor(){
    super();

    this.state = {
      createdisabled: false
    }
  }

  createNew(go){
    event.preventDefault();
    if(this.refs.newname.value==""){
      Materialize.toast("Please enter an event name.", 4000);
      return;
    }
    Meteor.call('addEvent', this.refs.newname.value, newevent.start._d, function(error, result){
      if(error){
        console.log(error.reason);
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
    console.log(this.refs.createevent);
    console.log(this.refs.editevent);
    if(event.target.value==""){
      this.setState({createdisabled: true});
      return;
    }
    this.setState({createdisabled: false});

  }

  render() {
    return (
      <div id="neweventmodal" className="modal">
        <div className="modal-content">
          <div className="input-field col s12">
            <input ref="newname" id="newname" type="text" onChange={this.checkValue.bind(this)} defaultValue={"New Event"} />
            <label htmlFor="icon_prefix">New Event Name</label>
          </div>
          <p id="neweventmodalstart"></p>
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
        </div>
      </div>
    )
  }
}
