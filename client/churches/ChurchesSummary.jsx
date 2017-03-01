import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ChurchSingle from './ChurchSingle.jsx';

// Instead of event "types" it needs to be event "tags"
//Events = new Mongo.Collection("events");
//Churches = new Mongo.Collection("churches");

export default class ChurchesSummary extends TrackerReact(React.Component) {
  constructor() {
    super();

  }


  churches(){
    return Churches.find({active: true},{sort: {active: -1}}).fetch();
  }

  oldchurches(){
    console.log("All inactive churches", Churches.find({active: false}).fetch());
    return Churches.find({active: false}).fetch();
  }

  unselect(){
    Session.set("chselected","");
  }


	render() {
    let active = this.churches();
    let inactive = this.oldchurches();
		return (
      <div className="row"  onClick={this.unselect.bind(this)}>
        <div className="col s12">
          <div className="row">
            {active.map( (church)=>{
                return <ChurchSingle key={church._id} church={church} selected={Session.get("chselected")==church._id} parent={this} />
            })}
          </div>
          {inactive.length>0&&<div className="divider"></div>}
          <div className="row">
            {inactive.map( (church)=>{
                return <ChurchSingle key={church._id} church={church} selected={Session.get("chselected")==church._id} parent={this} />
            })}
          </div>
        </div>
      </div>
  )
	}
}
