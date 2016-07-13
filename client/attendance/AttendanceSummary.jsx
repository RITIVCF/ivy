import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import EventSingle from './EventSingle.jsx';

// Instead of event "types" it needs to be event "tags"
//Events = new Mongo.Collection("events");

export default class AttendanceSummary extends TrackerReact(React.Component) {
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
    return Events.find({published: true, start: {$lt: new Date()} },{
      sort: {start:0}// Sorts descending chronologically by start
    }).fetch();
  }



	render() {
    document.title= "Ivy - Attendance Summary Page";
		return (
      <div>
      <div className="summary">
        <div className="myschedule">
          <h1>Attendance Dashboard</h1>
          {this.events().map( (ivevent)=>{
              return <EventSingle key={ivevent._id} ivevent={ivevent} parent={this}/>
          })}
        </div>
      </div>
      <a href="/events/old"><button>View old events</button></a>
    </div>
  )
	}
}
