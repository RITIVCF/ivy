import React from 'react';
import { Tracker } from 'meteor/tracker';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import EventSingle from './EventSingle.jsx';

// Instead of event "types" it needs to be event "tags"
//Events = new Mongo.Collection("events");

export default class AttendanceSummary extends TrackerReact(React.Component) {
  constructor() {
    super();

  }



  // componentDidMount(){
  //   console.log("logging state");
  //   console.log(this.state);
  //   var thiz = this;
  //   Tracker.autorun(function(){
  //     Meteor.subscribe("pastEvents", thiz.state.num);
  //   });
  // }

  loadMore(){
    event.preventDefault();
    //console.log("loading more");
    //console.log(this.state.num);
    var incnum = this.state.num;
    this.state.num = this.state.num + 10;
    this.state.subscription.Events = Meteor.subscribe("pastEvents", this.state.num);
  }

  events(){
    // pulls past, published events
    return Events.find().fetch();
  }



	render() {
    return(
      <div>
        {this.events().map( (ivevent)=>{
            return <EventSingle key={ivevent._id} ivevent={ivevent} parent={this}/>
        })}
        {/*Events.find().fetch().length >= this.state.num ?
        <button onClick={this.loadMore.bind(this)}>Load More</button>

        :<div></div>*/}
      </div>
        )
	}
}
