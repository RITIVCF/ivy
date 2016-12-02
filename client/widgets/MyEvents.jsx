import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import EventItem from './EventItem.jsx';

export default class MyEvents extends TrackerReact(React.Component) {
	constructor(){
		super();

		this.state = {
			subscription:{
				events: Meteor.subscribe("UpcomingAndAttendedEvents")
			}
		};

	}

	componentWillUnmount(){
		this.state.subscription.events.stop();
	}

	getUpcoming(){
		return Events.find({published: true, start: {$gte: new Date()}}).fetch();
	}

	getRecent(){
		return Events.find({"attendees._id":Meteor.user().contact} ).fetch();
	}


	render() {
		return (
			<div className="card">
				<div className="card-content">
					<span className="card-title">My Events</span>
					<p><b>Upcoming Events</b></p>
					<ul className="collection">
						{this.state.subscription.events.ready()?this.getUpcoming().length!=0?this.getUpcoming().map((event)=>{
							return <EventItem key={event._id} rsvp={true} event={event} />
						}):<li className="collection-item">No Upcoming Events.</li>:""}
					</ul>
					<p><b>Events I recently attended</b></p>
					<ul className="collection">
						{this.state.subscription.events.ready()?this.getRecent().length!=0?this.getRecent().map((event)=>{
							return <EventItem key={event._id} rsvp={false} event={event} />
						}):<li className="collection-item">No Recent Events.</li>:""}
					</ul>
				</div>
			</div>
		)
	}
}
