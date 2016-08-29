import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';


// Instead of event "types" it needs to be event "tags"
//Events = new Mongo.Collection("events");

export default class EventCalendarSub extends TrackerReact(React.Component) {
  constructor() {
    super();
    this.state = {
      subscription: {
        Events: Meteor.subscribe("publishedEvents")
      }
    }
  }

  componentWillUnmount(){
    this.state.subscription.Events.stop();
  }


  events(){
    // pulls upcoming, published events
    return Events.find({published: true, end: {$gt: moment().subtract(5, "hours")._d},
      start: {$lt: moment().add(4,"weeks")._d} },{$sort: {start:-1}}).fetch();
  }



	render() {
    document.title="Ivy - Calendar";
		return (
      <div>
        <div className="row">
          <div className="col-sm-3 col-lg-2">
            <nav className="navbar navbar-default navbar-fixed-side">
              <div className="col-sm-12">

              </div>
            </nav>
          </div>
          <div className="col-sm-9 col-lg-10">
            <h1>Event Calendar</h1>
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="row">
                  <div className="col-md-12">
                    {this.events().map( (event) => {
                      return (<div  key={event._id} className="panel panel-success">
                        <div className="panel-heading">{event.name}</div>
                        <div className="panel-body">
                          {event.description}<br/>
                        {moment(event.start.toISOString()).format("ddd DD MMM hh:mmA")}<br/>
                        <a href={"/forms/signin/"+event._id}><button className="btn btn-primary">Form</button></a>
                        </div>
                      </div>)
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
	}
}
