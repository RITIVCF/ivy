import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import EditTicketForm from './EditTicketForm.jsx';
import LoaderCircle from '../LoaderCircle.jsx';
import NoPerm from '../NoPerm.jsx';


export default class EditTicketsWrapper extends TrackerReact(React.Component) {
  constructor(props) {
    super(props);

    this.state = {
      subscription: {
        ticket: Meteor.subscribe("thisTicket", props.tid),
    //    options: Meteor.subscribe("allOptions"),
    //    events: Meteor.subscribe("allEvents"),
        //users: Meteor.subscribe("allUsers"),
        contacts: Meteor.subscribe("allContacts")
      }
    };
  }

  componentWillUnmount() {
    this.state.subscription.ticket.stop();
  //  this.state.subscription.users.stop();
    this.state.subscription.contacts.stop();
    //this.state.subscription.options.stop();
//    this.state.subscription.events.stop();
  }

  checkSubscriptions(){
    if(this.state.subscription.ticket.ready()&&
  //  this.state.subscription.users.ready()&&
    this.state.subscription.contacts.ready()){
  //  this.state.subscription.options.ready()&&
    //this.state.subscription.events.ready())
      return true;
    }
    return false;
  }


	render() {
    document.title="Ivy - Ticket";
    if(!this.checkSubscriptions()){
      return (<LoaderCircle />)
    }
    if(!checkPermission("tickets")){
			return <NoPerm />
		}
    var ticket = Tickets.findOne(this.props.tid);
    if(ticket){
        document.title="Ivy - "+ ticket.subject;
    }
		return (
      <div>
        {ticket ? <EditTicketForm ref="ticketform" ticket={ticket} /> : <div></div>}
      </div>
  )
	}
}
