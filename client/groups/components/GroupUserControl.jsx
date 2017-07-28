import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SelectUser from '../../sharedcomponents/SelectUser.jsx';
import User from './User.jsx';
import { getUsers } from '/lib/users.js';


export default class GroupUserControl extends TrackerReact(React.Component) {
	constructor(props) {
    super(props);

  }

  componentWillUnmount() {

  }

	addUser(user){
		Meteor.call("addUserToGroup", this.props.group._id, user._id);
		//user.component.state.value="";
		//user.component.forceUpdate();
	}

	getUsers(){
		let query = {
			_id: {$in: this.props.group.users}
		};
		return getUsers(query);
	}

	unset(){

	}

	render() {

		let users = this.getUsers();

		return (
			<div>

				<p>Add users to the group:</p>
				<SelectUser
					parent={this}
					unset={this.unset.bind(this)}
					users={true}
					initialValue={""}
					updateUser={this.addUser.bind(this)}
				ref="contact" />
				<table className="bordered striped">
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user)=>{
							return <User key={user._id} gid={this.props.group._id} user={user} />
						})}
					</tbody>
				</table>
			</div>
		)
	}
}
