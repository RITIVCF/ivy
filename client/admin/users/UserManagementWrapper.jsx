import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import UserManagementForm from './UserManagementForm.jsx';
import UserPage from './UserPage.jsx';

export default class UserManagementWrapper extends TrackerReact(React.Component) {
	constructor(){
		super();
		this.state = {
			subscription: {
				Users: Meteor.subscribe("allUsers"),
				Contacts: Meteor.subscribe("userContacts")
			}
		};
		

	}

	componentWillUnmount() {
		this.state.subscription.Users.stop();
		this.state.subscription.Contacts.stop();
	}

	

	render() {
		if(!checkPermission("admin")){
			return <div>Sorry you don't have permission to view this page. Please see the leadership team to get access.</div>
		}
		return (
			<div className="container">
				{!this.props.uid?(this.state.subscription.Users.ready()&&this.state.subscription.Contacts.ready())?
					<UserManagementForm />
				:"":<UserPage uid={this.props.uid} />}
			</div>
		)
	}
}
