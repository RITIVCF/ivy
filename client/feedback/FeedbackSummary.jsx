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
            <h4>Working on these</h4>
          </div>
        </div>
          {this.workingOn().length>0?this.workingOn().map((feedback)=>{
            return <FeedbackSingle key={feedback._id}
              feedback={feedback} />
          }):<div className="card"><div className="card-content"><p>No currently working feedback.</p></div></div>}
        <div className="card">
          <div className="card-content">
            <h4>The Rest</h4>
          </div>
        </div>
          {this.theRest().length>0?this.theRest().map((feedback)=>{
            return <FeedbackSingle key={feedback._id}
              feedback={feedback} />
          }):<div className="card"><div className="card-content"><p>Congrats, you finished it all!</p></div></div>}
      </div>
    )
	}
}
