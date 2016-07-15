import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import UserProfile from './UserProfile.jsx';



export default class UserProfileWrapper extends TrackerReact(React.Component) {
	constructor(props) {
    super(props);

		if(typeof props.uid === 'undefined'){
      this.state = {
        subscription: {
          Ethnicities: Meteor.subscribe("allEthnicities"),
          user: Meteor.subscribe("userSelf", Meteor.userId())
        }
      }
    }
    else{
      this.state = {
        subscription: {
          Ethnicities: Meteor.subscribe("allEthnicities"),
          user: Meteor.subscribe("userSelf", this.props.uid),
					userself: Meteor.subscribe("userSelf", Meteor.userId())
          }
        };

    }
  }

	componentWillUnmount() {
    this.state.subscription.user.stop();
		this.state.subscription.Ethnicities.stop();
		console.log("Wrapper unmounted");
  }


	componentWillMount(){
		console.log("Wrapper Mounted");
	}

	render() {
		if(!this.state.subscription.user.ready()){
      return(<div></div>)
    }
		return (
		<div>
			<UserProfile uid={this.props.uid}  />
		</div>
		)
	}
}
