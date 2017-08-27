import React, {Component} from 'react';

export default class ButtonDelete extends Component {
  deleteSG(event){
    event.preventDefault();
    var result = window.confirm("Are you sure you want to delete SG? *This action cannot be undone.*");
    if(result == true){
      Meteor.call('deleteSG',this.props.gid);
      location.assign("/sg");
    }
  }

  render(){
    return (
      <button onClick={this.deleteSG.bind(this)}>Delete</button>
    )
  }
}
