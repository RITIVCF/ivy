import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import EventCalendar from './EventCalendar.jsx';


//Events = new Mongo.Collection("events");

export default class EventCalendarWrapper extends TrackerReact(React.Component) {


  fetchScheduled(start, end, timezone, callback) {
    // FullCalendar calls this function with a start time, end time, timezone
    //   and callback function. Provide callback with an array of events.
    if (start._isAMomentObject) {
      start = start._d;
    }
    if (end._isAMomentObject) {
      end = end._d;
    }
    e = Events.find({$or:
                      [{start: {$gte: start, $lt: end}},
                        {end: {$gte: start, $lt: end}},
                        {$and:
                          [{start: {$lte: start}},
                            {end: {$gt: end}}]}
                      ]}).fetch();
    e = e.map((event) => {
      // Add a "start" key for now
      //event.start = event.createdAt;
      // Copy name to title for FullCalendar
      event.title = event.name;
      return event;
    });
    callback(e);
  }

	render() {

		return (
		<div>
      <h1>Event Calendar</h1>
			<div className="calendar">
        <EventCalendar events={this.fetchScheduled} ref="calendar"/>
      </div>
		</div>
		)
	}
}
