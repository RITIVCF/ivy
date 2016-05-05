import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import EventSingle from './EventSingle.jsx';

// Instead of event "types" it needs to be event "tags"
Events = new Mongo.Collection("events");

export default class EventSummary extends TrackerReact(React.Component) {
  createNew(event){
    event.preventDefault();
    //creates a new event and opens event details in event workspace
    console.log("This button creates a new event");
    var id = Meteor.call('addBlankEvent',function(error, result){
      if(error){
        console.log(error.reason);
        return;
      }
      console.log(result);
      location.assign("events/workspace");
    });

  }

  events(){
    // pulls upcoming, published events
    return Events.find({published: true, start: {$gt: new Date()} }).fetch();
  }

  myunpublished(){
    // pulls users's unpublished events
    var testuserID = 5;
    return Events.find({published: false, edit:testuserID}).fetch();
  }

  myscheduled(){
    // pulls events on which a user is scheduled
    var testuserID = 7;
    return Events.find({edit: testuserID }).fetch();
  }

  openPopup(event){
    event.preventDefault();/*
    $('<div id="__msg_overlay">').css({
      "width" : "100%"
    , "height" : "100%"
    , "background" : "#000"
    , "position" : "fixed"
    , "top" : "0"
    , "left" : "0"
    , "zIndex" : "50"
    , "MsFilter" : "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)"
    , "filter" : "alpha(opacity=60)"
    , "MozOpacity" : 0.6
    , "KhtmlOpacity" : 0.6
    , "opacity" : 0.6

}).appendTo(document.body);*/
  }

	render() {
    document.title=" RIT IVCF - Event Summary Page";
		return (
		<div>
      <h1>Event Summary Page</h1>
			<div className="sidebar">
        <ul>
          <li><button onClick={this.createNew.bind(this)}>New</button></li>
          <li><button onClick={this.openPopup.bind(this)}>Test Popup</button></li>
        </ul>

			</div>
			<div className="summary">
        {/*<h2>Event Summary Page</h2>*/}
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
