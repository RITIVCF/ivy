import React, {Component} from 'react';

export default class Contact extends Component {
  remove(event){
    event.preventDefault();
    Meteor.call("removeUserFromGroup", this.props.gid, this.props.uid);
  }

  getContact(){
    return Meteor.users.findOne(this.props.uid);
  }


  render(){
    contact = this.getContact();
    return(
      <tr id="hover-me">
        <td>{contact.name}</td>
        <td>
          {contact.emails[0].address}
          <button
            style={{float: "right"}}
            className="btn btn-danger"
            id="hover-content"
            onClick={this.remove.bind(this)}>
              Remove
          </button>
        </td>
      </tr>
    )
  }
}
