import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import EventWorkspace from './EventWorkspace.jsx';

import MainBox from '../MainBox.jsx';
import WorkspacePanel from './WorkspacePanel.jsx';
import LoaderCircle from '../LoaderCircle.jsx';


//Options = new Mongo.Collection("options");

getUserGroupPermission = function(){
	var grps = Groups.find({users: Meteor.userId()}).fetch();
	var ids = [];
	grps.forEach(function(group){
		ids.push(group._id);
	});
	return ids;
}

export default class EventWorkspaceWrapper extends TrackerReact(React.Component) {
	constructor(props) {
    super(props);

    this.state = {
      subscription: {
        Event: Meteor.subscribe("thisEvent", props.eid),
				tickets: Meteor.subscribe("eventTickets", props.eid),
				users: Meteor.subscribe("allUsers"),
				contacts: Meteor.subscribe("allContacts"),
			//	options: Meteor.subscribe("allOptions")
		},
		groups: getUserGroupPermission()
    };
  }

  componentWillUnmount() {
    this.state.subscription.Event.stop();
		this.state.subscription.tickets.stop();
		this.state.subscription.users.stop();
		this.state.subscription.contacts.stop();
	//	this.state.subscription.options.stop();
  }



	openReoccuring(event){
		event.preventDefault();
		this.refs.reoccuringOverlay.openOverlay();
	}




	getEvent(){
		////console.log(Events.find({_id: this.props.eid}).fetch());
		//return Events.find({_id: this.props.eid}).fetch();

		return Events.findOne(this.props.eid);
	}

	checkGroup(id){
		//console.log(this.state.groups);
		//console.log(this.state.groups.indexOf(id));
		return this.state.groups.indexOf(id)>-1;
	}

	render() {
		if(!this.state.subscription.Event.ready()){
			return (<LoaderCircle />);
		}
		if(!checkPermission('events')){
			return <div>Sorry. It looks like you don't have permission to view this page. Please check with your leadership team to get access.</div>
		}
	let ev = this.getEvent();

	document.title = "Ivy - "+ ev.name;
	var perms = checkEventPermission(ev);
	if(!perms.view){
		return(<p>You do not have permission to view this event's workspace.</p>)
	}

		return (
				<MainBox
					content={<EventWorkspace perm={perms.edit} ev={ev} />}
					subheader={""}
					showinfobar={true}
					infobar={<WorkspacePanel perm={perms.edit} ev={ev} />}
					/>
		)
	}
}
