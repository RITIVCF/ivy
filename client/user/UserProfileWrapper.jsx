import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {Tracker} from 'meteor/tracker';
import ContactProfile from '../contact/ContactProfile.jsx';
import LoaderCircle from '../LoaderCircle.jsx';
import Contact from '/lib/classes/Contact.js';


export default class UserProfileWrapper extends TrackerReact(React.Component) {
	constructor(props) {
    super(props);

		this.state={
			subscription: {
				Events: Meteor.subscribe("myAttendedEvents")
			}
		};

  }

	componentWillUnmount() {
		this.state.subscription.Events.stop();
  }

	getContact(){
		return new Contact(Meteor.user());
	}

	render() {
		if(!this.state.subscription.Events.ready()){
			return <LoaderCircle />
		}

		let contact = this.getContact();

		return (
		<div className="container">
			<ContactProfile contact={contact} parent={this} subscriptions={this.state.subscription} />
		</div>
		)
	}
}
