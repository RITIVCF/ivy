import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ChurchesSingle from './ChurchSingle.jsx';

// Instead of event "types" it needs to be event "tags"
//Events = new Mongo.Collection("events");

export default class ChurchesOld extends TrackerReact(React.Component) {
  constructor() {
    super();

    this.state = {
      subscription: {
        Churches: Meteor.subscribe("allChurches")
      }
    };
  }

  componentWillUnmount() {
    this.state.subscription.Churches.stop();
  }




  churches(){

    return Churches.find({active: false}).fetch();
  }



	render() {
    document.title=" RIT IVCF - Old/Inactive Churches";
		return (
      <div>
      <h1>Old/Inactive Churches</h1>
      <div className="sidebar">
        <a href="/churches"><button>Churches Summary</button></a>
      </div>
      <div className="summary">
        <div className="myold">
          <h1>Old/Inactive</h1>
          {this.churches().map( (church)=>{
              return <ChurchesSingle key={church._id} church={church} parent={this} showActiveBtn={true} /> //showPubBtn - show publish un publish button
          })}
        </div>
      </div>
    </div>
  )
	}
}
