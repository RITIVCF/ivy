import React, {Component} from 'react';

export default class ChurchContact extends Component {
  remove(event){
    event.preventDefault();
    this.props.ch.removeContact(this.props.contact._id);

  }


  render(){
    let contact = this.props.contact;
    return (
      <tr>
        <td>{contact.getName()}</td>
        <td>{contact.getEmail()}</td>
        <td><i className="material-icons right" onClick={this.remove.bind(this)}>close</i></td>
      </tr>
    )
  }
}
