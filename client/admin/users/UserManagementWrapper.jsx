import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import UserManagementForm from './UserManagementForm.jsx';

export default class PagePermissionsWrapper extends TrackerReact(React.Component) {
	constructor(){
		super();
		this.state = {
			subscription: {
				Users: Meteor.subscribe("allUsers"),
				Contacts: Meteor.subscribe("userContacts")
			}
		};
		document.title="Ivy - User Management";

	}

	componentWillUnmount() {
		this.state.subscription.Users.stop();
		this.state.subscription.Contacts.stop();
	}

	createNew(){
		FlowRouter.go("/signup");
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
							<div className="btn-group btn-group-justified" role="group" aria-label="...">
								<div className="btn-group" role="group">
									<button className="btn btn-primary"
										onClick={this.createNew.bind(this)}>New</button>
								</div>
							</div>
						</nav>
					</div>
					<div className="col-sm-9 col-lg-10">
						{(this.state.subscription.Users.ready()&&this.state.subscription.Contacts.ready())?
							<UserManagementForm />
						:""}
					</div>
				</div>
			</div>
		)
	}
}
