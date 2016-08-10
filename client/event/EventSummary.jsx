import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import EventSingle from './EventSingle.jsx';
import JobSingleSummary from './jobs/JobSingleSummary.jsx';
import EventWorkspace from './EventWorkspace.jsx';
import NewEventWindow from './NewEventWindow.jsx';

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
  /*
  newEvent(event){
		event.preventDefault();
  	this.refs.neweventoverlay.openOverlay();
  }
  */
  createNew(event){
    event.preventDefault();
    console.log(event);
    console.log(this);
    var component = this;
    //creates a new event and opens event details in event workspace
    console.log("This button creates a new event");
    Meteor.call('addBlankEvent', function(error, result){
      if(error){
        console.log(error.reason);
        return;
      }
      console.log("Event ID: " + result);
      console.log(this);
      console.log(component);
      //location.assign("/events/workspace/"+result);
      FlowRouter.go("/events/workspace/"+result);
    //this.Session.set("eventId",result);
    //location.assign("/events");

    // pop up the thing, make the event and use the callback to get the id. Then set the "create"
    // button with a html link to the workspace with that id. I think that'll work.

    //this.props.parent.state.eventId = result;
    //setID(result);
  });  
  }


  events(){
    // pulls upcoming, published events
    return Events.find({published: true, end: {$gt: new Date()},
      start: {$lt: moment().add(4,"weeks")._d} },{$sort: {start:-1}}).fetch();
  }

  myunpublished(){
    // pulls users's editable current and future events
    return Events.find({$and: [{owner: Meteor.userId()},
      {$or: [{end: {$gt: new Date()}}, {published:false}]}]}, {$sort:{start:-1}}).fetch();
  }

  myscheduled(){
    // pulls events on which a user is scheduled
    return Events.find( {jobs:{$elemMatch:{uid: Meteor.userId(),status:{$ne:"Declined"}}}} ).fetch();
  }


	render() {
    document.title="Ivy - Event Dashboard";
		return (
      <div>
        <NewEventWindow ref="neweventoverlay" parent={this} />
        <h1>Event Dashboard</h1>
        <div className="sidebar">
          <ul>
            <li><button className="button alert" onClick={this.createNew.bind(this)}>New</button></li>
          </ul>
        </div>
      <div className="summary">

        <div className="myschedule">
          <h1>My Schedule</h1>
          {this.myscheduled().map( (ivevent)=>{
              return <JobSingleSummary key={ivevent._id} ev={ivevent} parent={this}/>
          })}
        </div>
        <div className="upcoming">
          <h1>Published Future Events</h1>
          {this.events().map( (ivevent)=>{
              return <EventSingle key={ivevent._id}  ivevent={ivevent} parent={this}/>
          })}
        </div>
        <div className="myunpublished">
          <h1>View/Edit My Events</h1>  {/*?Set the events that are published a different color?*/}
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
