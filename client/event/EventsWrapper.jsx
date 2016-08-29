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
       Events: Meteor.subscribe("summaryEvents"),
				ownerEvents: Meteor.subscribe("ownerEvents")
      }};
  }

	componentWillUnmount() {
    this.state.subscription.Events.stop();
		this.state.subscription.ownerEvents.stop();
  }


	render() {
		if(!checkPermission("events")){
			return <div>Sorry. It looks like you don't have permission to view this page. Please check with your leadership team to get access.</div>
		}
			return <EventSummary parent={this} />
	}
}
