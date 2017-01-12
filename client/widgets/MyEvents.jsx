import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import EventItem from './EventItem.jsx';

export default class MyEvents extends TrackerReact(React.Component) {
	constructor(){
		super();

		this.state = {
			subscription:{
				Uevents: Meteor.subscribe("UpcomingEvents"),
				Aevents: Meteor.subscribe("AttendedEvents")
			}
		};

	}

	componentWillUnmount(){
		this.state.subscription.Uevents.stop();
		this.state.subscription.Aevents.stop();
	}

	getUpcoming(){
		return Events.find({published: true, start: {$gte: new Date()}},{sort: {start: 1}}).fetch();
	}

	getRecent(){
		return Events.find({"attendees._id":Meteor.userId()} ,{sort: {start: -1}}).fetch();
	}


	render() {
		return (
			<div className="card">
				<div className="card-content">
					<span className="card-title">My Events</span>
					<p><b>Upcoming Events</b></p>
					<ul className="collection">
						{this.state.subscription.Uevents.ready()&&this.state.subscription.Aevents.ready()
							?this.getUpcoming().length!=0?this.getUpcoming().map((event)=>{
							return <EventItem key={event._id} rsvp={true} event={event} />
						}):<li className="collection-item">No Upcoming Events.</li>:""}
					</ul>
					<p><b>Events I recently attended</b></p>
					<ul className="collection">
						{this.state.subscription.Uevents.ready()&&this.state.subscription.Aevents.ready()
							?this.getRecent().length!=0?this.getRecent().map((event)=>{
							return <EventItem key={event._id} rsvp={false} event={event} />
						}):<li className="collection-item">No Recent Events.</li>:""}
					</ul>
				</div>
			</div>
		)
	}
}
