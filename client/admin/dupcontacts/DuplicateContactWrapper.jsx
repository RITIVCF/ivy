import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import DuplicateContactForm from './DuplicateContactForm.jsx';

export default class DuplicateContactWrapper extends TrackerReact(React.Component) {
	constructor(){
		super();

		this.state={
			subscription: {
					Contacts: Meteor.subscribe("duplicateContacts"),
			}
		};

	}

	componentWillUnmount(){
		this.state.subscription.Contacts.stop();
	}

	render() {
		document.title="Ivy - Duplicate Contacts";
		if(!checkPermission("admin")){
			return <div>Sorry you don't have permission to view this page. Please see the leadership team to get access.</div>
		}
		if(!this.state.subscription.Contacts.ready()){
			return <div>Loading...</div>
		}
		return (
		<div>
			<DuplicateContactForm  />
		</div>
		)
	}
}
