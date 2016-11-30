import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import RequestWrapper from '../request/RequestWrapper.jsx';
import EventName from './components/EventName.jsx';
import EventDescription from './components/EventDescription.jsx';
import EventWorkpad	from './components/EventWorkpad.jsx';
import InfoBar from '../InfoBar.jsx';
import WorkspacePanel from './WorkspacePanel.jsx';

//Options = new Mongo.Collection("options");

getUserGroupPermission = function(){
	var grps = Groups.find({users: Meteor.userId()}).fetch();
	var ids = [];
	grps.forEach(function(group){
		ids.push(group._id);
	});
	return ids;
}

export default class EventWorkspace extends TrackerReact(React.Component) {
	constructor(props) {
    super(props);

    this.state = {
      subscription: {
        Events: Meteor.subscribe("thisEvent", props.eid),
				tickets: Meteor.subscribe("eventTickets", props.eid),
				users: Meteor.subscribe("allUsers"),
				contacts: Meteor.subscribe("allContacts"),
			//	options: Meteor.subscribe("allOptions")
		},
		groups: getUserGroupPermission()
    };
  }

  componentWillUnmount() {
    this.state.subscription.Events.stop();
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
		if(!checkPermission('events')){
			return <div>Sorry. It looks like you don't have permission to view this page. Please check with your leadership team to get access.</div>
		}
	let ev = this.getEvent();

	if(!ev){
		return (<div>Loading...</div>);
	}
	document.title = "Ivy - "+ ev.name;
	var perm = false;// ev.perm[""]
	var view = false;
	for(i=0; i < ev.permUser.length; i++){
		if(ev.permUser[i].id == Meteor.userId()){
			view = true;
			perm = ev.permUser[i].edit;
			break;
		}
	}
	//console.log(ev.permGroup);
	for(i=0; i < ev.permGroup.length; i++){
		if(this.checkGroup(ev.permGroup[i].id)){
			//console.log("true");
			view = true;
			perm = ev.permGroup[i].edit||perm;
			break;
		}
	}
	if(ev.owner==Meteor.userId()){
		view = true;
		perm = true;
	}
	if(!view){
		return(<p>You do not have permission to view this event's workspace.</p>)
	}

		return (
			<div className="row" style={{height: "100%"}}>
				<div className="col s12">
					<div className="card">
						<div className="card-image">
							<img src="/images/defaultEventSmall.png" />
							<EventName ev={ev} perm={perm} />
						</div>
						<div className="card-content">
							<EventDescription ev={ev} perm={perm} />
							<EventWorkpad ev={ev} perm={perm} />
							<RequestWrapper eid={this.props.eid} parent={this} perm={perm} />
						</div>
					</div>
				</div>
				<InfoBar content={<WorkspacePanel perm={perm} ev={ev} subscription={this.state.subscription} />} />
			</div>
		)
	}
}
