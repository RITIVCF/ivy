import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class Attendee extends TrackerReact(React.Component) {
  constructor(){
    super();

  }
  /*getContact(){
    return Contacts.findOne(this.props.contact._id);
  }*/

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
      <tr onDoubleClick={this.go.bind(this)}  className={status}>
        <td>{this.props.contact.name}</td>
        <td>{this.props.contact.emails[0].address}</td>
        <td>{this.props.contact.phone}</td>
        <td>{this.props.contact.firsttime ? "Yes":""}</td>
        <td>{this.props.contact.more?"Yes":""}</td>
        <td>{this.props.contact.howhear?this.props.contact.howhear:""}</td>
        {checkPermission("tickets") ?
        <td>{!!ticket ? this.props.contact.firsttime||(status!="success") ? <a  className="btn flat" onClick={this.viewTicket.bind(this)}>View</a>:"":""}</td>:""}
      </tr>
    )
  }
}
