import React, {Component} from 'react';

export default class Contact extends Component {
  remove(event){
    event.preventDefault();
    Meteor.call("removeChurchContact", this.props.ch._id, this.props.contact._id);
  }


  render(){
    return(
      <li>
        <button onClick={this.remove.bind(this)}>X</button>
        <div>{this.props.contact.name}</div>
        <div>{this.props.contact.email}</div>
        <div>{this.props.contact.phone}</div>
        <br />
      </li>
    )
  }
}
