import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import EventSingle from './EventSingle.jsx';


Events = new Mongo.Collection("events");

export default class EventSummary extends TrackerReact(React.Component) {
  createNew(event){
    event.preventDefault();
    //creates a new event and opens event details in event workspace
    console.log("This button creates a new event");
    var id = Meteor.call('addBlankEvent');
    console.log("Created new event with id: "+id.toString());
  }

  events(){
    // pulls upcoming, published events

    return Events.find({published: true, date: {$gt: Date()}}).fetch();
  }

  myunpublished(){
    // pulls users's unpublished events
    var testuserID = 5;
    return Events.find({published: false,edit:testuserID}).fetch();
  }

  myscheduled(){
    // pulls events on which a user is scheduled
    var testuserID = 7;
    return Events.find({edit: testuserID }).fetch();
  }

	render() {

		return (
		<div>
      <h1>Event Summary Page</h1>
			<div className="sidebar">
        <ul>
          <li><button onClick={this.createNew.bind(this)}>New</button></li>
        </ul>

			</div>
			<div className="summary">
        <h2>Event Summary Page</h2>
        <div className="myschedule">
          <h1>My Schedule</h1>
          {this.myscheduled().map( (ivevent)=>{
              return <EventSingle key={ivevent._id} ivevent={ivevent} />
          })}
        </div>
        <div className="upcoming">
          <h1>Upcoming Events</h1>
          {this.events().map( (ivevent)=>{
              return <EventSingle key={ivevent._id} ivevent={ivevent} />
          })}
        </div>
        <div className="myunpublished">
          <h1>My Unpublished Events</h1>
          {this.myunpublished().map( (ivevent)=>{
              return <EventSingle key={ivevent._id} ivevent={ivevent} />
          })}
        </div>
			</div>
		</div>
		)
	}
}
