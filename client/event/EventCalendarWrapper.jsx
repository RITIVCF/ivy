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
        <div id="maincontentdiv" className="col s12">
          <div className="card">
            <div className="card-content">
              {Options.findOne("calendarview")?<EventCalendar ref="calendar" height={650} />:<div></div>}
            </div>
          </div>
        </div>
      </div>
		)
	}
}
