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
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-sm-3 col-lg-2">
						<nav className="navbar navbar-default navbar-fixed-side">

						</nav>
					</div>
					<div className="col-sm-9 col-lg-10">
						<h1>Manage Duplicate Contacts</h1>
						{this.state.subscription.Contacts.ready()?<DuplicateContactForm  />:<div>Loading...</div>}
					</div>
				</div>
			</div>
		)
	}
}
