import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import EventSingle from './EventSingle.jsx';

// Instead of event "types" it needs to be event "tags"
//Events = new Mongo.Collection("events");

export default class EventOld extends TrackerReact(React.Component) {
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




  events(){
    // pulls upcoming, published events
    return Events.find({start: {$lt: new Date()} },{sort: {start: 0}}).fetch();
  }



	render() {
    document.title="Ivy - Old Events";
		return (
      <div>
      <div className="sidebar">
        <a href="/events"><button>Event Summary</button></a>
      </div>
      <div className="summary">
        <div className="myold">
          <h1>Old Events</h1>
          {this.events().map( (ivevent)=>{
              return <EventSingle key={ivevent._id} ivevent={ivevent} parent={this} showPubBtn={true} /> //showPubBtn - show publish un publish button
          })}
        </div>
      </div>
    </div>
  )
	}
}
