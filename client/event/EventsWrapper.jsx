import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import EventSummary from './EventSummary.jsx';
import EventWorkspace from './EventWorkspace.jsx';

// Instead of event "types" it needs to be event "tags"
//Events = new Mongo.Collection("events");

export default class EventsWrapper extends TrackerReact(React.Component) {
	constructor() {
    super();

    this.state = {
      subscription: {
        Events: Meteor.subscribe("allEvents")
      },
			eventId: ""
    };
  }

	render() {
		if(this.state.eventId){
			return <EventSummary parent={this} />
		}
		else{
			return <EventWorkspace id={this.state.eventId} parent={this} />
		}
	}
}
