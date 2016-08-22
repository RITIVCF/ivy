import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SelectUser from '../../sharedcomponents/SelectUser.jsx';
import User from './User.jsx';


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

	unset(){

	}

	render() {

		return (
		<div>

			<p>Add users to the group:</p>
			<SelectUser
				parent={this}
				unset={this.unset.bind(this)}
				users={true}
				initialValue={""}
				updateContact={this.addUser.bind(this)}
				ref="contact" />
			<table className="table table-striped">
				<thead>
					<tr>
						<th>Remove</th>
						<th>Name</th>
						<th>Email</th>
					</tr>
				</thead>
				<tbody>
					{this.props.group.users.map((uid)=>{
						return <User key={uid} gid={this.props.group._id} uid={uid} />
					})}
				</tbody>
			</table>
		</div>
		)
	}
}
