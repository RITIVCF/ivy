import React, {Component} from 'react';

export default class ButtonDelete extends Component {
  deleteEvent(event){
    event.preventDefault();
    var result = window.confirm("Are you sure you want to delete event? *This action cannot be undone.*");
    if(result == true){
      console.log("you clicked 'yes'.");
      Meteor.call('deleteEvent',this.props.eid);
      location.assign("/events");
    }
    else{
      console.log("you clicked 'no'.");
    }

  }

  render(){
    return (
      <button className="btn btn-default navbar-btn" onClick={this.props.parent.openDelete()}>Delete</button>
    )
  }
}
