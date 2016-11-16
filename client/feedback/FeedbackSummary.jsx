import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import FeedbackSingle from './FeedbackSingle.jsx';

// Instead of event "types" it needs to be event "tags"
//Events = new Mongo.Collection("events");

export default class FeedbackSummary extends TrackerReact(React.Component) {
  constructor() {
    super();

  }

  workingOn(){
    return Feedback.find({completed: false, working: true},{sort: {createdAt: -1}}).fetch();
  }

  theRest(){
    return Feedback.find({completed: false, working: false}, {sort: {createdAt: -1}}).fetch();
  }

	render() {
		return (
      <div>
        <div className="card">
          <div className="card-content">
            <span className="card-title">Working on these</span>
              {this.workingOn().map((feedback)=>{
                return <FeedbackSingle key={feedback._id} feedback={feedback} />
              })}
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <span className="card-title">The Rest</span>
              {this.theRest().map((feedback)=>{
                return <FeedbackSingle key={feedback._id} feedback={feedback} />
              })}
          </div>
        </div>
      </div>
    )
	}
}
