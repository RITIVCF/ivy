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
        Events: Meteor.subscribe("publishedEvents"),
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

  subsReady(){
    return (this.state.subscription.Events.ready()&&this.state.subscription.Tickets.ready()&&this.state.subscription.Contacts.ready())?true:false
  }

  getEvent(){
		//console.log(Events.find({_id: this.props.eid}).fetch());
		//return Events.find({_id: this.props.eid}).fetch();
    console.log(this.state.subscription.Events.ready());
		var ev = Events.findOne(this.props.eid);
		var attendees = [];
		var contact;
		ev.attendees.map( (attendee)=>{
			contact = Meteor.users.findOne(attendee._id);
			for(var key in contact){
				attendee[key] = contact[key];
			}
		});
		return ev;
	}

	render() {
    //document.title= "Ivy - Attendance Dashboard";
    if(!checkPermission("attendance")){
      console.log("false");
			return <div>Sorry. It looks like you don't have permission to view this page. Please check with your leadership team to get access.</div>
		}
    console.log("true");
    document.title = "Ivy - Attendance Dashboard";
		return (
      <div className="container">
				<div className="row">
					<div className="col s12">
            {/*this.subsReady()?FlowRouter.current().path=="/attendance"?<h1>Attendance Dashboard</h1>:<h1>Event Detail</h1>:""*/}
            {this.subsReady()?FlowRouter.current().path=="/attendance"?<AttendanceSummary />:<EventDetail ev={this.getEvent()} />:""}
					</div>
				</div>
			</div>
  )
	}
}
