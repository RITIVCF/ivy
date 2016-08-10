import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ChurchSingle from './ChurchSingle.jsx';
import ChurchWorkspace from './ChurchesWorkspace.jsx';

// Instead of event "types" it needs to be event "tags"
//Events = new Mongo.Collection("events");
//Churches = new Mongo.Collection("churches");

export default class ChurchesSummary extends TrackerReact(React.Component) {
  constructor() {
    super();

    this.state = {
      subscription: {
        Churches: Meteor.subscribe("allChurches"),
        options: Meteor.subscribe("allOptions")
      }
    };
  }

  componentWillUnmount() {
    this.state.subscription.Churches.stop();
  }

  createNew(event){
    event.preventDefault();
    console.log(event);
    console.log(this);
    //creates a new event and opens event details in event workspace
    console.log("This button creates a new church");
    /*Meteor.call('addBlankChurch', function(error, result){
      if(error){
        console.log(error.reason);
        return;
      }
      console.log("Church ID: " + result);
      console.log(this);
      location.assign("/churches/workspace/"+result);
      //this.Session.set("eventId",result);
      //location.assign("/events");

      //this.props.parent.state.eventId = result;
      //setID(result);
    });
    */
    Meteor.call('addBlankChurch');
  }


  churches(){
    // pulls upcoming, published events
    return Churches.find({active: true}).fetch();
  }

  oldchurches(){
    return Churches.find({active: false}).fetch();
  }


	render() {
    document.title="Ivy - Churches Dashboard";
		return (
      <div>
      <h1>Churches Dashboard</h1>
      <div className="sidebar">
        <ul>
          <li><button onClick={this.createNew.bind(this)}>New</button></li>
        </ul>

      </div>
      <div className="summary">
        <div className="churches">
          <h1>Active Churches</h1>
          {this.churches().map( (church)=>{
              return <ChurchSingle key={church._id} church={church} parent={this} />
          })}
        </div>
        <div className="oldinactive">
          <h1>Old/Inactive Churches</h1>
            {this.oldchurches().map( (church)=>{
                return <ChurchSingle key={church._id} church={church} parent={this} />
            })}
        </div>
      </div>
      {/*<a href="/churches/old"><button>View old/inactive churches</button></a>  */}
    </div>
  )
	}
}
