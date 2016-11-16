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
    return Contacts.findOne(
      Meteor.users.findOne(this.props.feedback.user).contact
      ).name;
  }

	render() {
    var status = "card";
    if(this.props.feedback.type=="Issue"){
      status="card red";
    }
    else if(this.props.feedback.type=="Comment"){
      status="card yellow";
    }
    else if(this.props.feedback.type=="Suggestion"){
      status="card green";
    }


		return (
      <div className={status}>
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
