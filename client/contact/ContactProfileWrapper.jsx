import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {Tracker} from 'meteor/tracker';
import ContactProfile from './ContactProfile.jsx';
import LoaderCircle from '../LoaderCircle.jsx';
import NoPerm from '../NoPerm.jsx';
import { Contact } from '/lib/classes/Contact.js';

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
				options: Meteor.subscribe("allOptions"),
				Events: Meteor.subscribe("myAttendedEvents")
			}
		};});

  }

	componentDidMount(){
		document.title = "Ivy - Contact Profile";
	}

	componentWillUnmount() {
		//console.log(this.state);
		this.state.subscription.Ethnicities.stop();
		this.state.subscription.user.stop();
    this.state.subscription.contact.stop();
		this.state.subscription.options.stop();
		this.state.subscription.ticket.stop();
		this.state.subscription.Events.stop();
		//console.log("Wrapper unmounted");
  }


	componentWillMount(){

	}

	getContact() {
    return new Contact(Meteor.users.findOne(this.props.cid));
	}

	render() {
		if(!this.state.subscription.contact.ready()){
			return(<LoaderCircle />)
		}
		if(!checkPermission("contacts")){
			return <NoPerm />
		}

		let contact = this.getContact();

		document.title = "Ivy - "+contact.getName()+"'s Profile";

		return (
		<div className="container" >
			<ContactProfile contact={contact} parent={this} subscriptions={this.state.subscription} modal={true} />
		</div>
		)
	}
}
