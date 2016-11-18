import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import UserRow from './UserRow.jsx';

export default class UserManagementForm extends TrackerReact(React.Component) {
	constructor(){
		super();

	}

	getUsers(){
		return Meteor.users.find().fetch();
	}

	createNew(){
		FlowRouter.go("/signup");
	}

	render() {
		return (
			<div>
				<div className="row">
					<div className="col s12 m8 l9">
						<h1>User Management</h1>
					</div>
					<div className="input-field col s12 m4 l3">
						<button className="waves-effect waves-light btn right"
							onClick={this.createNew.bind(this)}>New</button>
					</div>
				</div>
				<div className="divider"></div>
				<div className="row">
					{this.getUsers().map((user)=>{
						return <UserRow key={user._id} uid={user._id} parent={this} />
					})}
				</div>
			</div>
		)
	}
}
