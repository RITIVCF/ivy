import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SmallGroupSingle from './SmallGroupSingle.jsx';

// Instead of event "types" it needs to be event "tags"
//Events = new Mongo.Collection("events");

export default class SmallGroupsOld extends TrackerReact(React.Component) {
  constructor() {
    super();

    this.state = {
      subscription: {
        SGs: Meteor.subscribe("allSGs")
      }
    };
  }

  componentWillUnmount() {
    this.state.subscription.SGs.stop();
  }




  SGs(){

    return SGs.find({active: false}).fetch();
  }



	render() {
    
		return (
      <div>
      <h1>Old/Inactive Small Groups</h1>
      <div className="sidebar">
        <a href="/sg"><button>Small Group Summary</button></a>
      </div>
      <div className="summary">
        <div className="old">
          <h1>Old/Inactive</h1>
          {this.churches().map( (sg)=>{
              return <SmallGroupSingle key={sg._id} sg={church} parent={this} showActiveBtn={true} /> //showPubBtn - show publish un publish button
          })}
        </div>
      </div>
    </div>
  )
	}
}
