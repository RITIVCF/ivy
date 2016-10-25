import React from 'react';
import { Tracker } from 'meteor/tracker';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import EventSingle from './EventSingle.jsx';

// Instead of event "types" it needs to be event "tags"
//Events = new Mongo.Collection("events");

export default class AttendanceSummary extends TrackerReact(React.Component) {
  constructor() {
    super();
    this.state = {
      num: 10
    };
    console.log(this.state.num);
    this.state = {
      subscription:{
        Events: Meteor.subscribe("pastEvents", this.state.num)
      },
      num:10
    };
  }

  componentWillUnmount() {
    this.state.subscription.Events.stop();
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
    console.log("loading more");
    console.log(this.state.num);
    var incnum = this.state.num;
    this.state.num = this.state.num + 10;
    this.state.subscription.Events = Meteor.subscribe("pastEvents", this.state.num);
  }

  events(){
    // pulls past, published events
    return Events.find().fetch();
  }



	render() {
    document.title= "Ivy - Attendance Dashboard";
    if(!checkPermission("attendance")){
			return <div>Sorry. It looks like you don't have permission to view this page. Please check with your leadership team to get access.</div>
		}
		return (
      <div className="container-fluid">
				<div className="row">
					<div className="col-sm-3 col-lg-2">
						<nav className="navbar navbar-default navbar-fixed-side">

						</nav>
					</div>
					<div className="col-sm-9 col-lg-10">
            <h1>Attendance Dashboard</h1>
            {this.state.subscription.Events.ready() ? this.events().map( (ivevent)=>{
                return <EventSingle key={ivevent._id} ivevent={ivevent} parent={this}/>
            }):""}
            {Events.find().fetch().length >= this.state.num ?
            <button onClick={this.loadMore.bind(this)}>Load More</button>
            :<div></div>}
					</div>
				</div>
			</div>
  )
	}
}
