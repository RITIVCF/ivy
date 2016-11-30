import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import EditTicketForm from './EditTicketForm.jsx';


export default class EditTicketsWrapper extends TrackerReact(React.Component) {
  constructor(props) {
    super(props);

    this.state = {
      subscription: {
        ticket: Meteor.subscribe("thisTicket", props.tid),
    //    options: Meteor.subscribe("allOptions"),
    //    events: Meteor.subscribe("allEvents"),
        users: Meteor.subscribe("allUsers"),
        contacts: Meteor.subscribe("allContacts")
      }
    };
  }

  componentWillUnmount() {
    this.state.subscription.ticket.stop();
    this.state.subscription.users.stop();
    this.state.subscription.contacts.stop();
    //this.state.subscription.options.stop();
//    this.state.subscription.events.stop();
  }

  checkSubscriptions(){
    if(this.state.subscription.ticket.ready()&&
    this.state.subscription.users.ready()&&
    this.state.subscription.contacts.ready()){
  //  this.state.subscription.options.ready()&&
    //this.state.subscription.events.ready())
      return true;
    }
    return false;
  }


	render() {
    document.title="Ivy - Ticket ";
    if(!checkPermission("tickets")){
			return <div>Sorry. It looks like you don't have permission to view this page. Please check with your leadership team to get access.</div>
		}
    var ticket = Tickets.findOne(this.props.tid);
    if(ticket){
        document.title="Ivy - "+ ticket.subject;
    }
    if(!this.checkSubscriptions()){
      return (<div></div>)
    }
		return (
      <div>
        {ticket ? <EditTicketForm ref="ticketform" ticket={ticket} /> : <div></div>}
      </div>
  )
	}
}
