import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import RequestWrapper from '../request/RequestWrapper.jsx';
import PermissionWindow from './permissions/PermissionWindow.jsx';
import DeleteEventWindow from './DeleteEventWindow.jsx';
import JobsWindow from './jobs/JobsWindow.jsx';
import JobSingle from './jobs/JobSingle.jsx';
import ButtonPublish from './components/ButtonPublish.jsx';
import ButtonDelete from './components/ButtonDelete.jsx';
import EventDateControls from './components/EventDateControls.jsx';
import EventName from './components/EventName.jsx';
import EventDescription from './components/EventDescription.jsx';
import EventLocation from './components/EventLocation.jsx';
import EventWorkpad	from './components/EventWorkpad.jsx';
import EventTags from './components/EventTags.jsx';
import EventEVR from './components/EventEVR.jsx';
import EventReserved from './components/EventReserved.jsx';

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

	viewPermissions(event){
		event.preventDefault();
  	this.refs.overlay.toggleOverlay();
  }

	viewJobs(event){
		event.preventDefault();
		this.refs.jobOverlay.toggleOverlay();
	}

	openReoccuring(event){
		event.preventDefault();
		this.refs.reoccuringOverlay.openOverlay();
	}

	openDelete(){
		event.preventDefault();
		this.refs.deleteOverlay.openOverlay();
	}


	getEvent(){
		//console.log(Events.find({_id: this.props.eid}).fetch());
		//return Events.find({_id: this.props.eid}).fetch();

		return Events.findOne(this.props.eid);
	}

	checkGroup(id){
		console.log(this.state.groups);
		console.log(this.state.groups.indexOf(id));
		return this.state.groups.indexOf(id)>-1;
	}

	render() {
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
	console.log(ev.permGroup);
	for(i=0; i < ev.permGroup.length; i++){
		if(this.checkGroup(ev.permGroup[i].id)){
			console.log("true");
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

		<div className="container-fluid">
			{perm?<JobsWindow ref="jobOverlay" eid={ev._id} />:""}
			{perm?<DeleteEventWindow ref="deleteOverlay" eid={ev._id} />:""}
			{/*}<ReoccuringEventWindow ref="reoccuringOverlay" ev={ev} /> */}
			{Meteor.userId()==ev.owner ? <PermissionWindow ref="overlay" parent={this} ev={ev} />:""}

			<div className="row">
				<div className="col-sm-3 col-lg-2">
					<nav className="navbar navbar-default navbar-fixed-side">
						<div className="col-sm-12">
						{perm?<button className="btn btn-default navbar-btn"
							onClick={this.viewJobs.bind(this)}>Schedule Request</button>:""}
						<h4>Scheduled Positions</h4>
						{this.state.subscription.contacts.ready() ? ev.jobs.map( (job)=>{
							return <JobSingle key={job.uid+job.job} job={job} parent={this} perm={perm} ev={ev} />
						}):""}

							{Meteor.userId()==ev.owner ? <input type="button"
								className="btn btn-default navbar-btn"
								onClick={this.viewPermissions.bind(this)} value="Permissions" />:""}

						</div>
					</nav>
				</div>
				<div className="col-sm-3 col-lg-2">
					<nav className="navbar navbar-default navbar-fixed-side">
						<div className="col-sm-12">
							{/*}<input type="checkbox" ref="reoc" onClick={this.openReoccuring.bind(this)} checked={ev.reocurring} />*/}
							{perm?<ButtonPublish published={ev.published} eid={this.props.eid} />:<p>Published: {ev.published?"Published":"Not Published"}</p>}
							{/*}<ButtonDelete eid={this.props.eid} parent={this} />*/}
							<a href={"/forms/signin/"+this.props.eid} ><button className="btn btn-info">Form</button></a>

							{perm?<button className="btn btn-danger navbar-btn" onClick={this.openDelete.bind(this)}>Delete</button>:""}
							<EventDateControls ev={ev} perm={perm} />

							<EventLocation ev={ev} perm={perm} />
							<EventEVR ev={ev} perm={perm} />
							<EventReserved ev={ev} perm={perm} />

							<h3>Tags</h3>
							<EventTags ev={ev} subscription={this.state.subscription.options} perm={perm} />
						</div>
					</nav>
				</div>
				<div className="col-sm-6 col-lg-8">
				{/*	<header className="special container">
	          <h2>Event Workspace</h2>
	        </header>*/}
					<div className="row" style={{height: '5px'}}>
					</div>

					<div className="panel panel-default">
						<div className="panel-heading">
						<EventName ev={ev} perm={perm} />
						<EventDescription ev={ev} perm={perm} />

						</div>
					</div>
					<div className="panel panel-default">
						<div className="panel-body">
							<EventWorkpad ev={ev} perm={perm} />
						</div>
					</div>
					<nav class="navbar navbar-default navbar-bottom">
					  <div class="container-fluid">
					    <RequestWrapper eid={this.props.eid} parent={this} perm={perm} />
					  </div>
					</nav>
				</div>
			</div>

		</div>
		)
	}
}
