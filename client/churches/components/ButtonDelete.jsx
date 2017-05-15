import React, {Component} from 'react';

export default class ButtonDelete extends Component {
  deleteChurch(event){
    //event.preventDefault();
    console.debug("Made it!");
    var result = window.confirm("Are you sure you want to delete church?");
    if(result == true){
      this.props.parent.close();
      this.props.ch.remove();
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
