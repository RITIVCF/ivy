import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {Tracker} from 'meteor/tracker';
import ContactProfile from './ContactProfile.jsx';



export default class ContactProfileWrapper extends TrackerReact(React.Component) {
	constructor(props) {
    super(props);

		Tracker.autorun(()=>{
		this.state={
			subscription: {
				Ethnicities: Meteor.subscribe("allEthnicities"),
				user: Meteor.subscribe("userSelf"),
				contact: Meteor.subscribe("contact", FlowRouter.getParam('cid')),
				ticket: Meteor.subscribe("ticket", FlowRouter.getParam('cid')),
				events: Meteor.subscribe("contactEvents", FlowRouter.getParam('cid')),
				options: Meteor.subscribe("allOptions")
			}
		};});

		/*
		if(typeof props.cid === 'undefined'){
			var thiz = this;
      this.state = {
        subscription: {
          Ethnicities: Meteor.subscribe("allEthnicities"),

					user: Meteor.subscribe("userSelf", {
						onReady: function(){
							//console.log("Inside Callback");
							//console.log(this);
							//console.log(thiz);
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
		//console.log(this.state);
		this.state.subscription.Ethnicities.stop();
		this.state.subscription.user.stop();
    this.state.subscription.contact.stop();
		this.state.subscription.options.stop();
		this.state.subscription.ticket.stop();
		//console.log("Wrapper unmounted");
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
		//console.log("Wrapper Mounted");
	}

	render() {
		/*
		//console.log(!this.state.contact);
		//console.log(this.state.contact);
		//console.log(this.state);
		if(!this.state.contact){
      return(<div></div>)
    }
		if(!this.state.contact.ready()){
			return(<div></div>)
		}*/
		/*if(!this.state.subscription.contact.ready()){
			return(<div></div>)
		}*/
		if(!checkPermission("contacts")){
			return <div>Sorry. It looks like you don't have permission to view this page. Please check with your leadership team to get access.</div>
		}

		return (
		<div>
			<ContactProfile cid={this.props.cid} parent={this} subscriptions={this.state.subscription} />
		</div>
		)
	}
}
