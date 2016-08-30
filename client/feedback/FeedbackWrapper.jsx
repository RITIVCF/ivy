import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import FeedbackSummary from './FeedbackSummary.jsx';

export default class FeedbackWrapper extends TrackerReact(React.Component) {
  constructor() {
    super();
    this.state = {
      subscription: {
        Feedback: Meteor.subscribe("allFeedback"),
        Contacts: Meteor.subscribe("allContacts"),
        Users: Meteor.subscribe("allUsers")
      }
    }
  }

  componentWillUnmount(){
    this.state.subscription.Feedback.stop();
    this.state.subscription.Contacts.stop();
    this.state.subscription.Users.stop();
  }

	render() {
    document.title="Ivy - Feedback";
		return (
      <div className="row">
  			<div className="col-sm-3 col-lg-2">
  				<nav className="navbar navbar-default navbar-fixed-side">

  				</nav>
  			</div>
  			<div className="col-sm-9 col-lg-10">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h1>All Feedback</h1>
            </div>
            <div className="panel-body">
              {checkPermission("feedback")?<div>
                {this.state.subscription.Contacts.ready()&&this.state.subscription.Users.ready()?
                  <FeedbackSummary />:""
                }
              </div>:"Sorry. You do not have permission to access this area. Please see leadership for access."}

            </div>
          </div>
        </div>
      </div>
    )
	}
}
