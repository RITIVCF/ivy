import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import EventCalendar from './EventCalendar.jsx';


//Events = new Mongo.Collection("events");

export default class EventCalendarWrapper extends TrackerReact(React.Component) {
  constructor() {
    super();

    this.state = {};

    var thiz = this;
     this.state.autorunHandle = Tracker.autorun(() => {
       var start = this.state.start || new Date();
       var end = this.state.end || new Date();
       thiz.state.subscription = Meteor.subscribe('publishedEvents',
         {$or: [
             {start: {$gte: start, $lt: end}},
             {end: {$gte: start, $lt: end}},
             {$and: [
                 {start: {$lte: start}},
                 {end: {$gt: end}}
               ]}
         ]}, function() {
           //console.log("Subscription update");
           Session.set("calendarUpdate", true);
         });
     });

  }

  componentWillUnmount() {
    this.state.subscription.stop();
    this.state.autorunHandle.stop();
    Session.set("calendarUpdate", null);
  }

  getEvents(){
    return Events.find().fetch();
  }

  fetchScheduled(start, end, timezone, callback) {
    // FullCalendar calls this function with a start time, end time, timezone
    //   and callback function. Provide callback with an array of events.
    if (start._isAMomentObject) {
      start = start._d;
    }
    if (end._isAMomentObject) {
      end = end._d;
    }
    e = Events.find({published:true, $or:
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
    document.title="Ivy - Event Calendar";
    events = this.getEvents();
    if(!events){
  		return (<div></div>);
  	}
    var thiz = this;
 		var wrappedFetch = (s, e, t, c) => {
       thiz.fetchScheduled(s, e, t, c, thiz);
     };

		return (
      <div className="row">
        <div className="col-md-12">
          <h1>Event Calendar</h1>

          <div className="calendar">
            <EventCalendar events={wrappedFetch} ref="calendar"/>
          </div>

        </div>
      </div>
		)
	}
}
