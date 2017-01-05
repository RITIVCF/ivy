import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import FeedbackSummary from './FeedbackSummary.jsx';

export default class FeedbackWrapper extends TrackerReact(React.Component) {
  constructor() {
    super();
    this.state = {
      subscription: {
        Feedback: Meteor.subscribe("allFeedback"),
        Contacts: Meteor.subscribe("allContacts")
        //Users: Meteor.subscribe("allUsers")
      }
    }
  }

  componentWillUnmount(){
    this.state.subscription.Feedback.stop();
    this.state.subscription.Contacts.stop();
    //this.state.subscription.Users.stop();
  }

	render() {
    document.title="Ivy - Feedback";
		return (
      <div className="row">
  			<div className="col s12">
          {checkPermission("feedback")?<div>
            {this.state.subscription.Contacts.ready()?
              <FeedbackSummary />:""
            }
                </div>:"Sorry. You do not have permission to access this area. Please see leadership for access."}
      </div>
    </div>
    )
	}
}
