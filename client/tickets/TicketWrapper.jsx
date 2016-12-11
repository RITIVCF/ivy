import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import MainBox from '../MainBox.jsx';
import TicketSummary from './TicketSummary.jsx';
import TicketPreview from './TicketPreview.jsx';
import LoaderCircle from '../LoaderCircle.jsx';
import NoPerm from '../NoPerm.jsx';

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

  toggleView(){
    Meteor.call("toggleTicketsInfoBar");
  }

  getSubHeader(){
    return <ul className="right">
      {Meteor.user().preferences.tickets_infobar?
        <li onClick={this.toggleView.bind(this)}><a><i className="material-icons black-text">info</i></a></li>
        :<li onClick={this.toggleView.bind(this)}>
          <a><i className="material-icons black-text">info_outline</i></a></li>}
    </ul>
  }


	render() {
    document.title="Ivy - Ticket Dashboard";
    if(!this.checkSubs()){
      return <LoaderCircle />
    }
    if(!checkPermission("tickets")){
			return <NoPerm />
		}
    //var ticket = Tickets.findOne(this.state.ticketId);
    var subsready = this.checkSubs();
    console.log(subsready);
		return (

      <MainBox
        content={<TicketSummary sub={subsready} />}
        subheader={this.getSubHeader()}
        infobar={<TicketPreview tkt={Tickets.findOne(Session.get("ticselected"))} />}
        showinfobar={Meteor.user().preferences.tickets_infobar}
      />
  )
	}
}
