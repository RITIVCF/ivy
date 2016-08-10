import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class Attendee extends TrackerReact(React.Component) {

  /*getContact(){
    return Contacts.findOne(this.props.contact._id);
  }*/

  go(){
    FlowRouter.go("/profile/"+this.props.contact._id);
  }

  render() {
    //console.log(this.props.contact);
    // This area needs styled, so however we need to do it to style
    // it correctly. Review Alex's mock ups and Jeanie's drawings.-->
    //let contact = this.getContact();
    //let contact = this.props.contact;

    return (
      <tr onClick={this.go.bind(this)}>
        <td>{this.props.contact.name}</td>
        <td>{this.props.contact.email}</td>
        <td>{this.props.contact.phone}</td>
        <td>{this.props.contact.firsttime ? "Yes":"No"}</td>
        <td>{this.props.contact.firsttime ? <a href={"/tickets/"+this.props.contact.ticket}><button>View Ticket</button></a>:""}</td>
      </tr>
    )
  }
}
