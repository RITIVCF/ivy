import React from 'react';
import { Tracker } from 'meteor/tracker';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import EventDetail from './EventDetail.jsx';
import LoaderCircle from '../LoaderCircle.jsx';
import NoPerm from '../NoPerm.jsx';

export default class AttendanceWrapper extends TrackerReact(React.Component) {
  constructor() {
    super();
    this.state = {
      num: 10
    };
    this.state = {
      subscription:{
        Events: Meteor.subscribe("publishedEvents"),
        Tickets: Meteor.subscribe("allTicketStatus"),
				Contacts: Meteor.subscribe("allContacts"),
				graduatedContacts: Meteor.subscribe("graduatedContacts"),
				expiredContacts: Meteor.subscribe("expiredContacts"),
				outofscopeContacts: Meteor.subscribe("outofscopeContacts")
      },
      num:10
    };
  }

  componentWillUnmount() {
    this.state.subscription.Events.stop();
    this.state.subscription.Tickets.stop();
		this.state.subscription.Contacts.stop();
  }

  subsReady(){
    return (this.state.subscription.Events.ready()&&this.state.subscription.Tickets.ready()&&this.state.subscription.Contacts.ready())?true:false
  }

  getEvent(){
		const ev = Events.findOne(this.props.eid);
		return ev;
	}

	render() {
    if(!this.subsReady()){
      return <LoaderCircle />
    }
    if(!checkPermission("attendance")){
			return <NoPerm />
		}
    setDocumentTitle("Attendance Dashboard");
		return (
				<div className="row">
					<div className="col s12">
            {this.subsReady()?FlowRouter.current().path=="/attendance"?false:<EventDetail ev={this.getEvent()} />:""}
					</div>
				</div>
  )
	}
}
