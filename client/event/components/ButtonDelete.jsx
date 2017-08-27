import React, {Component} from 'react';

export default class ButtonDelete extends Component {
  deleteEvent(event){
    event.preventDefault();
    var result = window.confirm("Are you sure you want to delete event? *This action cannot be undone.*");
    if(result == true){
      Meteor.call('deleteEvent',this.props.eid);
      Session.set("evselected","");
      location.assign("/events");
    }

  }

  render(){
    return (
      <a className="btn-flat" onClick={this.props.parent.openDelete()}>Delete</a>
    )
  }
}
