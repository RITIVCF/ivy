import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import UserProfileDetail from './UserProfileDetail.jsx';



export default class UserProfileWrapper extends TrackerReact(React.Component) {
	userDetails() {
		return Meteor.users.find({_id : Meteor.userId()}).fetch();
	}

	render() {

		return (
		<div>
			<h1>This is still hidden unfortunately</h1>
			{this.userDetails().map( (userdetail)=>{
				return <UserProfileDetail key={userdetail._id} userdetail={userdetail} />
			})}
		</div>
		)
	}
}
