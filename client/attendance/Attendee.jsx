import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class Attendee extends TrackerReact(React.Component) {
  constructor(){
    super();

  }

  componentWillUnmount(){
    $('.tooltipped').tooltip('remove');
  }

  go(){
    if(!checkPermission("contacts")){
      return;
    }
    FlowRouter.go("/people/"+this.props.contact._id);
  }

	getStatusMessage(){
		let message = "";
		switch (this.props.contact.status) {
			case "Out Of Scope":
			case "Deleted":
			case "Graduated":
				message = this.props.contact.status;
				break;
			default:
				message = "";
		}

		if(!message){
			return "";
		} else {
			return `(${message})`;
		}

	}

  viewTicket(event){
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
    var ticket = Tickets.findOne(this.props.contact.ticket)

    var status = "";
    if(ticket){

      if(ticket.status == "Closed"){

        status = "ticket-closed";
        if(!ticket.assigneduser){
          status += " unassignedclosed";
        }
      }
      else if(ticket.status == "Pending"||ticket.status=="In Progress"){

        status = "ticket-pending";
        if(!ticket.assigneduser){
          status += " unassignedpending";
        }
      }
      else {

        status = "ticket-open";
        if(!ticket.assigneduser){
          status += " unassignedopen";
        }
      }
    }
    return (
      <tr onDoubleClick={this.go.bind(this)} >
        {
					checkPermission("tickets") &&
					<td style={{textAlign: "center"}} className={status} />
				}
        <td>{this.props.contact.getName()} {this.getStatusMessage()}</td>
        <td>{this.props.contact.getEmail()}</td>
        <td>{this.props.contact.getPhone()}</td>
        <td>{this.props.contact.firsttime && "Yes"}</td>
        <td>{this.props.contact.more && "Yes"}</td>
        <td>{this.props.contact.howhear&&this.props.contact.howhear}</td>
        {this.props.showTicketColumn &&
					<td>
						{
							!!ticket ?
								(this.props.contact.firsttime||(ticket.status!="Closed")) &&
									<a  className={ticket.assigneduser==Meteor.userId()?"btn tooltipped":"btn-flat tooltipped"} data-position="left" data-delay="50" data-tooltip={this.getTicketAssignedUser(ticket)} onClick={this.viewTicket.bind(this)}>View</a>
							:""
						}
					</td>
				}
      </tr>
    )
  }
}
