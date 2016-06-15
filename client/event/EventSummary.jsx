import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import EventSingle from './EventSingle.jsx';
import EventWorkspace from './EventWorkspace.jsx';

// Instead of event "types" it needs to be event "tags"
//Events = new Mongo.Collection("events");

export default class EventSummary extends TrackerReact(React.Component) {
  constructor() {
    super();

    this.state = {
      subscription: {
        Events: Meteor.subscribe("allEvents")
      }
    };
  }

  componentWillUnmount() {
    this.state.subscription.Events.stop();
  }

  createNew(event){
    event.preventDefault();
    console.log(event);
    console.log(this);
    //creates a new event and opens event details in event workspace
    console.log("This button creates a new event");
    Meteor.call('addBlankEvent', function(error, result){
      if(error){
        console.log(error.reason);
        return;
      }
      console.log("Event ID: " + result);
      console.log(this);
      location.assign("/events/workspace/"+result);
      //this.Session.set("eventId",result);
      //location.assign("/events");

      //this.props.parent.state.eventId = result;
      //setID(result);
    });

  }


  events(){
    // pulls upcoming, published events
    return Events.find({published: true, end: {$gt: new Date()} }).fetch();
  }

  myunpublished(){
    // pulls users's unpublished events
    return Events.find({published: false, owner: Meteor.userId()}).fetch();
  }

  myscheduled(){
    // pulls events on which a user is scheduled
    return Events.find({end: {$gt: new Date()}, jobs:{_id:"BtbQJmvLGrkFNj8ck"} }).fetch();
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
    document.title="Ivy - Event Dashboard";
		return (
      <div>
        <nav className="navbar-default navbar-side" role="navigation">
          <ul className="nav navbar-nav">
            <li><button className="button alert" onClick={this.createNew.bind(this)}>New</button></li>
          </ul>
        </nav>
        <br></br>
      <div className="summary">
              <h1>Event Dashboard</h1>
        <div className="myschedule">
          <h1>My Schedule</h1>
          {this.myscheduled().map( (ivevent)=>{
              return <EventSingle key={ivevent._id} ivevent={ivevent} parent={this}/>
          })}
        </div>
        <div className="upcoming">
          <h1>Published Future Events</h1>
          {this.events().map( (ivevent)=>{
              return <EventSingle key={ivevent._id}  ivevent={ivevent} parent={this}/>
          })}
        </div>
        <div className="myunpublished">
          <h1>View/Edit Unpublished Events</h1>
          {this.myunpublished().map( (ivevent)=>{
              return <EventSingle key={ivevent._id}  ivevent={ivevent} parent={this} />
          })}
        </div>
      </div>
      <a href="/events/old"><button className="button new">View old events</button></a>
    </div>
  )
	}
}
