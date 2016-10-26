import React from 'react';
import { Tracker } from 'meteor/tracker';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import AttendanceSummary from './AttendanceSummary.jsx';
import EventDetail from './EventDetail.jsx';
//import EventSingle from './EventSingle.jsx';

// Instead of event "types" it needs to be event "tags"
//Events = new Mongo.Collection("events");

export default class AttendanceWrapper extends TrackerReact(React.Component) {
  constructor() {
    super();
    this.state = {
      num: 10
    };
    this.state = {
      subscription:{
        Events: Meteor.subscribe("pastEvents", this.state.num),
        Tickets: Meteor.subscribe("allTicketStatus"),
				Contacts: Meteor.subscribe("allContacts")
      },
      num:10
    };
  }

  componentWillUnmount() {
    this.state.subscription.Events.stop();
    this.state.subscription.Tickets.stop();
		this.state.subscription.Contacts.stop();
  }

  getEvent(){
		//console.log(Events.find({_id: this.props.eid}).fetch());
		//return Events.find({_id: this.props.eid}).fetch();
		var ev = Events.findOne(this.props.eid);
		var attendees = [];
		var contact;
		ev.attendees.map( (attendee)=>{
			contact = Contacts.findOne(attendee._id);
			for(var key in contact){
				attendee[key] = contact[key];
			}
		});
		return ev;
	}

	render() {
    //document.title= "Ivy - Attendance Dashboard";
    if(!checkPermission("attendance")){
			return <div>Sorry. It looks like you don't have permission to view this page. Please check with your leadership team to get access.</div>
		}

		return (
      <div className="container-fluid">
				<div className="row">
					<div className="col-sm-3 col-lg-2">
						<nav className="navbar navbar-default navbar-fixed-side">
              {this.state.subscription.Events.ready()?FlowRouter.current().path=="/attendance"?<div></div>:<AttendanceSummary />:<div></div>}
						</nav>
					</div>
					<div className="col-sm-9 col-lg-10">
            {this.state.subscription.Events.ready()?FlowRouter.current().path=="/attendance"?<h1>Attendance Dashboard</h1>:<h1>Event Detail</h1>:""}
            {this.state.subscription.Events.ready()?FlowRouter.current().path=="/attendance"?<AttendanceSummary />:<EventDetail ev={this.getEvent()} />:""}
					</div>
				</div>
			</div>
  )
	}
}
