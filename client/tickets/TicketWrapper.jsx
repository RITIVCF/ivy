import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import TicketSummary from './TicketSummary.jsx';

export default class TicketWrapper extends TrackerReact(React.Component) {
  constructor() {
    super();

    this.state = {
      subscription: {
        Tickets: Meteor.subscribe("allActiveTickets"),
        options: Meteor.subscribe("allOptions"),
      //  events: Meteor.subscribe("allEvents"),
        users: Meteor.subscribe("allUsers"),
        contacts: Meteor.subscribe("allContacts")
      },
      filter: "assigneduser",
      ticketId: false
    };

  }

  componentWillUnmount() {
    this.state.subscription.Tickets.stop();
    this.state.subscription.users.stop();
    this.state.subscription.contacts.stop();
    this.state.subscription.options.stop();
  //  this.state.subscription.events.stop();
  }

  checkSubs(){
    return this.state.subscription.Tickets.ready()&&
    this.state.subscription.users.ready()&&
    this.state.subscription.contacts.ready()&&
    this.state.subscription.options.ready();
  //  this.state.subscription.events.ready();
  }


	render() {
    document.title="Ivy - Ticket Dashboard";
    if(!checkPermission("tickets")){
			return <div>Sorry. It looks like you don't have permission to view this page. Please check with your leadership team to get access.</div>
		}
    //var ticket = Tickets.findOne(this.state.ticketId);
    var subsready = this.checkSubs();
    console.log(subsready);
		return (
      <div className="row">
        <div className="col s12" style={{height: "100%"}}>
                  <TicketSummary sub={subsready} />
        </div>
      </div>
  )
	}
}
