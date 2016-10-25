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

	render() {
		return (
			<div>
				<h1>User Management</h1>
				<div className="panel panel-default">
					{/*}<div className="panel-body">

					</div>*/}
					<table className="table table-striped table-hover table-responsive">
						<thead>
							<tr>
								<th>Name</th>
								<th>Email</th>
							</tr>
						</thead>
						<tbody>
							{this.getUsers().map((user)=>{
								return <UserRow key={user._id} uid={user._id} />
							})}
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}
