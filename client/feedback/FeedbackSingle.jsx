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
		return (
      <div className="panel panel-info">
        <div className="panel-body">
          <p>User: {this.getUser()}</p>
          <p>{this.props.feedback.text}</p>
          <p>Submitted: {moment(this.props.feedback.createdAt).format("MMM DD, YY  h:mm A")}</p>
          <button className="btn btn-success"
            onClick={this.complete.bind(this)}
            >Complete</button>
          {this.props.feedback.working?"":
          <button className="btn btn-warning"
            onClick={this.working.bind(this)}>
            Work On It!
          </button>}
        </div>
      </div>
    )
	}
}
