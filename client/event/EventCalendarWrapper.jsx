import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import EventCalendar from './EventCalendar.jsx';
import InfoBar from '../InfoBar.jsx';
import EventPreview from './EventPreview.jsx';
import LoaderCircle from '../LoaderCircle.jsx';
import NoPerm from '../NoPerm.jsx';

//Events = new Mongo.Collection("events");

export default class EventCalendarWrapper extends TrackerReact(React.Component) {
  constructor() {
    super();
    var thiz = this;
    this.state = {
      subscription: {
        myEvents: Meteor.subscribe("myEvents"),
        UnpublishedEvents: Meteor.subscribe("otherUnpublishedEvents")
      }
    };
  }

  componentWillUnmount() {
    this.state.subscription.myEvents.stop();
    this.state.subscription.UnpublishedEvents.stop();
  }



	render() {
    document.title="Ivy - Event Calendar";
    if(Options.findOne("calendarview")){
      return <div>
          <EventCalendar ref="calendar" height={650} />
          <InfoBar content={<EventPreview event={Events.findOne(Session.get("evselected"))} />} />
        </div>
    }
		return (<LoaderCircle />)
	}
}
