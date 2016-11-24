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
