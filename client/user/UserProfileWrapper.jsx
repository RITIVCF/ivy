import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {Tracker} from 'meteor/tracker';
import ContactProfile from '../contact/ContactProfile.jsx';



export default class UserProfileWrapper extends TrackerReact(React.Component) {
	constructor(props) {
    super(props);

		// Tracker.autorun(()=>{
		// this.state={
		// 	subscription: {
		// 		Ethnicities: Meteor.subscribe("allEthnicities"),
		// 		user: Meteor.subscribe("userSelf"),
		// 		contact: Meteor.subscribe("contact", FlowRouter.getParam('cid')),
		// 		options: Meteor.subscribe("allOptions")
		// 	}
		// };});

		this.state={
			subscription: {
				Ethnicities: Meteor.subscribe("allEthnicities"),
				user: Meteor.subscribe("userSelf"),
				contact: Meteor.subscribe("thisContact"),
				options: Meteor.subscribe("allOptions")
			}
		};

		/*
		if(typeof props.cid === 'undefined'){
			var thiz = this;
      this.state = {
        subscription: {
          Ethnicities: Meteor.subscribe("allEthnicities"),

					user: Meteor.subscribe("userSelf", {
						onReady: function(){
							console.log("Inside Callback");
							console.log(this);
							console.log(thiz);
							thiz.setState({
								contact: Meteor.subscribe("contact", Meteor.user().contact)
							});
						}
					})
        }
      }
    }
    else{
      this.state = {
        subscription: {
          Ethnicities: Meteor.subscribe("allEthnicities"),
					user: Meteor.subscribe("userSelf")
				},
				contact: Meteor.subscribe("contact", this.props.cid)
        };

    }
		*/
  }



	componentWillUnmount() {
		console.log(this.state);
		this.state.subscription.Ethnicities.stop();
		this.state.subscription.user.stop();
    this.state.subscription.contact.stop();
		this.state.subscription.options.stop();
		console.log("Wrapper unmounted");
  }


	componentWillMount(){
		// Tracker.autorun(()=>{
		// this.state={
		// 	subscription: {
		// 		Ethnicities: Meteor.subscribe("allEthnicities"),
		// 		user: Meteor.subscribe("userSelf"),
		// 		contact: Meteor.subscribe("contact", FlowRouter.getParam('cid'))
		// 	}
		// };});
		console.log("Wrapper Mounted");
	}

	render() {
		/*
		console.log(!this.state.contact);
		console.log(this.state.contact);
		console.log(this.state);
		if(!this.state.contact){
      return(<div></div>)
    }
		if(!this.state.contact.ready()){
			return(<div></div>)
		}*/
		/*if(!this.state.subscription.contact.ready()){
			return(<div></div>)
		}*/

		return (
		<div className="container-fluid">
			<ContactProfile cid={this.props.cid} parent={this} subscriptions={this.state.subscription} />
		</div>
		)
	}
}
