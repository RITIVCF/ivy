import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import FeedbackSummary from './FeedbackSummary.jsx';
import LoaderCircle from '../LoaderCircle';
import NoPerm from '../NoPerm';

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
    
    if(!this.state.subscription.Contacts.ready()){
      return <LoaderCircle />
    }
    if(!checkPermission("feedback")){
      return <NoPerm />
    }
		return (
      <div className="row">
  			<div className="col s12">
            <FeedbackSummary />
      </div>
    </div>
    )
	}
}
