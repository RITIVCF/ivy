import React, {Component} from 'react';

export default class Contact extends Component {
  remove(event){
    event.preventDefault();
    Meteor.call("removeChurchContact", this.props.ch._id, this.props.contact._id);
  }


  render(){
    return(
      <tr>
        <td><button onClick={this.remove.bind(this)}>X</button></td>
        <td>{this.props.contact.name}</td>
        <td>{this.props.contact.email}</td>
        <td>{this.props.contact.phone}</td>
      </tr>
    )
  }
}
