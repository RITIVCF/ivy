import React, {Component} from 'react';

export default class Contact extends Component {
  remove(event){
    event.preventDefault();
    Meteor.call("removeUserFromGroup", this.props.gid, this.props.uid);
  }

  getContact(){
    return Contacts.findOne(Meteor.users.findOne(this.props.uid).contact);
  }


  render(){
    contact = this.getContact();
    return(
      <tr>
        <td><button onClick={this.remove.bind(this)}>X</button></td>
        <td>{contact.name}</td>
        <td>{contact.email}</td>
      </tr>
    )
  }
}
