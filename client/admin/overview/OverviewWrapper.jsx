import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import OverviewPage from './OverviewPage.jsx';

export default class OverviewWrapper extends TrackerReact(React.Component) {
	constructor(){
		super();
		this.state = {
			subscription: {
				Users: Meteor.subscribe("allUsers"),
				Contacts: Meteor.subscribe("allContacts"),
				Funnel: Meteor.subscribe("funnelHistory")
			}
		};
		document.title="Ivy - Chapter Overview";

	}

	componentWillUnmount() {
		this.state.subscription.Users.stop();
		this.state.subscription.Contacts.stop();
		this.state.subscription.Funnel.stop();
	}

	render() {
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
						<h1>Chapter Overview</h1>
						{this.state.subscription.Funnel.ready()?<OverviewPage />:<div></div>}

					</div>
				</div>
			</div>
		)
	}
}
