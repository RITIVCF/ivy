import React, {Component} from 'react';

export default class Contact extends Component {
  remove(event){
    event.preventDefault();
    Meteor.call("removeContactFromGroup", this.props.gid, this.props.cid);
  }

  getContact(){
    return Meteor.users.findOne(this.props.cid);
  }


  render(){
    contact = this.getContact();
    return(
      <tr>
        <td><button onClick={this.remove.bind(this)}>X</button></td>
        <td>{contact.name}</td>
        <td>{contact.emails[0].address}</td>
      </tr>
    )
  }
}
