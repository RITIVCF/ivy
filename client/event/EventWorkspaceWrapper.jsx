import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import EventWorkspace from './EventWorkspace.jsx';

import MainBox from '../MainBox.jsx';
import WorkspacePanel from './WorkspacePanel.jsx';
import LoaderCircle from '../LoaderCircle.jsx';
import NoPerm from '../NoPerm.jsx';

import Event from '/lib/classes/Event.js';


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
		var thiz = this;
    this.state = {
      subscription: {
        Event: Meteor.subscribe("thisEvent", props.eid, function(){thiz.setState({ready: true})}),
				tickets: Meteor.subscribe("eventTickets", props.eid),
				//users: Meteor.subscribe("allUsers"),
				contacts: Meteor.subscribe("allContacts"),
			//	options: Meteor.subscribe("allOptions")
		},
		groups: getUserGroupPermission(),
		ready: false,
		submitted: false
    };
  }

  componentWillUnmount() {
    this.state.subscription.Event.stop();
		this.state.subscription.tickets.stop();
		//this.state.subscription.users.stop();
		this.state.subscription.contacts.stop();
	//	this.state.subscription.options.stop();
  }



	openReoccuring(event){
		event.preventDefault();
		this.refs.reoccuringOverlay.openOverlay();
	}

	request(event){
		event.preventDefault();
		var thiz = this;
		Meteor.call("eventRequestPerm", this.props.eid, function(error){
			if(error){
				window.alert(error);
				console.log(error);
			}else{
				thiz.setState({submitted: true});
			}

		});
	}


	getEvent(){
		////console.log(Events.find({_id: this.props.eid}).fetch());
		//return Events.find({_id: this.props.eid}).fetch();

		return new Event(Events.findOne(this.props.eid));
	}

	checkGroup(id){
		//console.log(this.state.groups);
		//console.log(this.state.groups.indexOf(id));
		return this.state.groups.indexOf(id)>-1;
	}

	render() {
		if(!this.state.ready){
			return (<LoaderCircle />);
		}
		if(!checkPermission('events')){
			return <NoPerm />
		}
		let ev = this.getEvent();

		document.title = "Ivy - "+ ev.name;
		var perms = checkEventPermission(ev);
		if(!perms.view){
			return(<div className="center-align" style={{paddingTop:"50px"}}>
				<div className="card-panel">
					<div className="card-content">
						{!this.state.submitted?<p>You do not have permission to view this event's workspace. Click <a href="" onClick={this.request.bind(this)}>here</a> to request permission to help with this event.</p>:<p>Submitted.</p>}

					</div>
				</div>
			</div>)
		}

		if(ev.isReviewed()){
			return (
				<div className="center-align" style={{paddingTop:"50px"}}>
					<div className="card-panel">
						<div className="card-content">
							<p>This event has been reviewed, and can no longer be edited.</p>
						</div>
					</div>
				</div>
			);
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
