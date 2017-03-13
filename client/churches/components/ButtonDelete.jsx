import React, {Component} from 'react';

export default class ButtonDelete extends Component {
  deleteChurch(event){
    event.preventDefault();
    var result = window.confirm("Are you sure you want to delete church?");
    if(result == true){
      //console.log("you clicked 'yes'.");
      $("#"+this.props.ch._id).modal('close');
      Meteor.call('deleteChurch',this.props.ch._id);
      //location.assign("/churches");
    }
    else{
      //console.log("you clicked 'no'.");
    }
  }

  render(){
    return (
      <a className="modal-action modal-close waves-effect waves-light btn red" onClick={this.deleteChurch.bind(this)}>Delete</a>
    )
  }
}
