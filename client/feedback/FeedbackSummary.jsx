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
        <h4>Working on these</h4>
        <div className="divider"></div>
          {this.workingOn().length>0?this.workingOn().map((feedback)=>{
            return <FeedbackSingle key={feedback._id}
              feedback={feedback} />
          }):<p>No currently working feedback.</p>}
        <h4>The Rest</h4>
        <div className="divider"></div>
          {this.theRest().length>0?this.theRest().map((feedback)=>{
            return <FeedbackSingle key={feedback._id}
              feedback={feedback} />
          }):<p>Congrats, you finished it all!</p>}
      </div>
    )
	}
}
