import React, {Component} from 'react';

export default class ButtonDelete extends Component {
  deleteSG(event){
    event.preventDefault();
    var result = window.confirm("Are you sure you want to delete SG? *This action cannot be undone.*");
    if(result == true){
      console.log("you clicked 'yes'.");
      Meteor.call('deleteSG',this.props.gid);
      location.assign("/sg");
    }
    else{
      console.log("you clicked 'no'.");
    }
  }

  render(){
    return (
      <button onClick={this.deleteSG.bind(this)}>Delete</button>
    )
  }
}
