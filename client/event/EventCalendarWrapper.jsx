import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import EventCalendar from './EventCalendar.jsx';


//Events = new Mongo.Collection("events");

export default class EventCalendarWrapper extends TrackerReact(React.Component) {
  constructor() {
    super();
    var thiz = this;
    this.state = {
      subscription: {
        Events: Meteor.subscribe("publishedEvents", {
          onReady: function () { } //thiz.refs.calendar.refresh(); }
        })
      }
    };
  }

  componentWillUnmount() {
    this.state.subscription.Events.stop();
  }



	render() {
    document.title="Ivy - Event Calendar";
		return (
      <div className="row">
        <div className="col-sm-3 col-lg-2">
          <nav className="navbar navbar-default navbar-fixed-side">

          </nav>
        </div>
        <div id="maincontentdiv" className="col-sm-9 col-lg-10">
          <h1>Event Calendar</h1>
          {Options.findOne("calendarview")?<EventCalendar ref="calendar" height={650} />:<div></div>}
        </div>
      </div>
		)
	}
}
