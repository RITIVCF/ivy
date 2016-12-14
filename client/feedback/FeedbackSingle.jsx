import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';


// Instead of event "types" it needs to be event "tags"
//Events = new Mongo.Collection("events");

export default class FeedbackSingle extends TrackerReact(React.Component) {
  constructor() {
    super();

  }

  complete(){
    if(window.confirm("Are you sure?")){
        Meteor.call("completeFeedback", this.props.feedback);
    }
  }

  working(){
    Meteor.call("workingFeedback", this.props.feedback);
  }

  getUser(){
    return Meteor.users.findOne(this.props.feedback.user).name;
  }


	render() {
    var status = {};
    if(this.props.feedback.type=="Issue"){
      status={outline: "solid red 2px"};
    }
    else if(this.props.feedback.type=="Comment"){
      status={outline: "solid yellow 2px"};
    }
    else if(this.props.feedback.type=="Suggestion"){
      status={outline: "solid green 2px"};
    }


		return (
      <div className="card" style={status}>
        <div className="card-content">
          <span className="card-title">{this.props.feedback.type}</span>
          <p>User: {this.getUser()}</p>
          <p>{this.props.feedback.text}</p>
          <p>Submitted: {moment(this.props.feedback.createdAt).format("MMM DD, YY  h:mm A")}</p>
          <a onClick={this.complete.bind(this)} className="waves-effect waves-light btn">Complete</a>

          {this.props.feedback.working?"":
            <a onClick={this.working.bind(this)} className="waves-effect waves-light btn">Work on it!</a>
          }
        </div>
      </div>
    )
	}
}
