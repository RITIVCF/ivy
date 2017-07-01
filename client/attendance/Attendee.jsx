import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class Attendee extends TrackerReact(React.Component) {
  constructor(){
    super();

  }
  /*getContact(){
    return Contacts.findOne(this.props.contact._id);
  }*/

  componentWillUnmount(){
    $('.tooltipped').tooltip('remove');
  }

  go(){
    if(!checkPermission("contacts")){
      return;
    }
    //console.log("go");
    FlowRouter.go("/people/"+this.props.contact._id);
  }



  viewTicket(event){
    //console.log("viewTIcket");
    event.stopPropagation();

    FlowRouter.go("/tickets/"+this.props.contact.ticket);
  }

  getTicketAssignedUser(ticket){
    if(Meteor.userId()==ticket.assigneduser){
      return "Me";
    }
    var user = Meteor.users.findOne(ticket.assigneduser);
    return user?user.name:"Not Assigned";
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
        //status = "material-icons green-text";
        status = "ticket-closed";
        if(!ticket.assigneduser){
          status += " unassignedclosed";
        }
      }
      else if(ticket.status == "Pending"||ticket.status=="In Progress"){
        //status = "material-icons gold-text";
        status = "ticket-pending";
        if(!ticket.assigneduser){
          status += " unassignedpending";
        }
      }
      else {
        //status = "material-icons red-text";
        status = "ticket-open";
        if(!ticket.assigneduser){
          status += " unassignedopen";
        }
      }
    }
    return (
      <tr onDoubleClick={this.go.bind(this)} >
        {checkPermission("tickets") &&
        <td style={{textAlign: "center"}} className={status}>
          {/*!!ticket && <i className={status}>stop</i>*/}
        </td>}
        <td>{this.props.contact.getName()}</td>
        <td>{this.props.contact.getEmail()}</td>
        <td>{this.props.contact.getPhone()}</td>
        <td>{this.props.contact.firsttime ? "Yes":""}</td>
        <td>{this.props.contact.more?"Yes":""}</td>
        <td>{this.props.contact.howhear?this.props.contact.howhear:""}</td>
        {checkPermission("tickets") ?
        <td>{!!ticket ?
            this.props.contact.firsttime||(ticket.status!="Closed") ?
            <a  className={ticket.assigneduser==Meteor.userId()?"btn tooltipped":"btn-flat tooltipped"} data-position="left" data-delay="50" data-tooltip={this.getTicketAssignedUser(ticket)} onClick={this.viewTicket.bind(this)}>View</a>
            :""
          :""}</td>:""}
      </tr>
    )
  }
}
