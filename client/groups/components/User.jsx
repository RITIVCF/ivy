import React, {Component} from 'react';

export default class User extends Component {
  remove(event){
    event.preventDefault();
    Meteor.call("removeUserFromGroup", this.props.gid, this.props.user._id);
  }

  getContact(){
    return this.props.user;
  }


  render(){
    contact = this.getContact();
    return(
      <tr id="showhim">
        <td>{contact.getName()}</td>
        <td>
          {contact.getEmail()}
        </td>
        <td>
          <span onClick={this.remove.bind(this)}
            className="material-icons" id="showme" >
            close
          </span>
        </td>
      </tr>
    )
  }
}
