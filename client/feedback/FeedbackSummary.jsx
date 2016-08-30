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
        <div className="panel panel-default">
          <div className="panel-heading">
            <h2>Working on these</h2>
          </div>
          <div className="panel-body">
            {this.workingOn().map((feedback)=>{
              return <FeedbackSingle key={feedback._id} feedback={feedback} />
            })}
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h2>The Rest</h2>
          </div>
          <div className="panel-body">
            {this.theRest().map((feedback)=>{
              return <FeedbackSingle key={feedback._id} feedback={feedback} />
            })}
          </div>
        </div>
      </div>
    )
	}
}
