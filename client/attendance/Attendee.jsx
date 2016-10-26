import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class Attendee extends TrackerReact(React.Component) {
  constructor(){
    super();
    this.state = {
      ran: false
    };
  }
  /*getContact(){
    return Contacts.findOne(this.props.contact._id);
  }*/

  go(){
    if(this.state.ran){
      return;
    }
    //console.log("go");
    FlowRouter.go("/contacts/"+this.props.contact._id);
  }



  viewTicket(){
    //console.log("viewTIcket");
    this.state.ran = true;
    FlowRouter.go("/tickets/"+this.props.contact.ticket);
  }

  render() {
    //console.log(this.props.contact);
    // This area needs styled, so however we need to do it to style
    // it correctly. Review Alex's mock ups and Jeanie's drawings.-->
    //let contact = this.getContact();
    //let contact = this.props.contact;  +this.ticketComplete.bind(this)
    var ticket = Tickets.findOne(this.props.contact.ticket)

    var status = "";
    if(ticket){
      //console.log(ticket.status);
      if(ticket.status == "Closed"){
        status = "success";
      }
      else if(ticket.status == "Pending"||ticket.status=="In Progress"){
        status = "warning";
      }
      else {
        status = "danger";
      }
    }
    return (
      <tr onClick={this.go.bind(this)} className={status}>
        <td>{this.props.contact.name}</td>
        <td>{this.props.contact.email}</td>
        <td>{this.props.contact.phone}</td>
        <td>{this.props.contact.firsttime ? "Yes":""}</td>
        <td>{this.props.contact.more?"Yes":""}</td>
        <td>{this.props.contact.howhear?this.props.contact.howhear:""}</td>
        {checkPermission("tickets") ?
        <td>{!!ticket ? this.props.contact.firsttime||(status!="success") ? <button className="btn btn-primary" onClick={this.viewTicket.bind(this)}>View Ticket</button>:"":""}</td>:""}
      </tr>
    )
  }
}
