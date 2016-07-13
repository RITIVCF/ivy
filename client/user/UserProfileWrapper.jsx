import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import UserProfile from './UserProfile.jsx';



export default class UserProfileWrapper extends TrackerReact(React.Component) {
	constructor() {
    super();

    this.state = {
      subscription: {
        user: Meteor.subscribe("userSelf")

      }
    };
  }

	componentWillUnmount() {
    this.state.subscription.user.stop();
  }

	userDetails() {
		return Meteor.users.find({_id : Meteor.userId()}).fetch();
	}

	render() {

		return (
		<div>
			<h1>My User Profile</h1>
			{this.userDetails().map( (userdetail)=>{
				return <UserProfile key={userdetail._id} userdetail={userdetail} />
			})}
		</div>
		)
	}
}
