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
      }
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

	render() {
	let ev = this.getEvent();

	if(!ev){
		return (<div>Loading...</div>);
	}
	var perm = false;// ev.perm[""]
	for(i=0; i < ev.permUser.length; i++){
		if(ev.permUser[i].id == Meteor.userId()){
			perm = ev.permUser[i].edit;
			break;
		}
	}
	for(i=0; i < ev.permGroup.length; i++){
		if(ev.permGroup[i].id == Meteor.userId()){
			perm = ev.permGroup[i].edit||perm;
			break;
		}
	}
	if(ev.owner==Meteor.userId()){
		perm = true;
	}

		return (

		<div classNme="container-fluid">
			{perm?<JobsWindow ref="jobOverlay" eid={ev._id} />:""}
			{perm?<DeleteEventWindow ref="deleteOverlay" eid={ev._id} />:""}
			{/*}<ReoccuringEventWindow ref="reoccuringOverlay" ev={ev} /> */}
			{Meteor.userId()==ev.owner ? <PermissionWindow ref="overlay" parent={this} ev={ev} />:""}
			<article id="main">

			<div className="row">
				<div className="col-sm-3 col-lg-2">
					<nav className="navbar navbar-default navbar-fixed-side">
						{Meteor.userId()==ev.owner ? <input type="button" onClick={this.viewPermissions.bind(this)} value="Permissions" />:""}
						{perm?<button onClick={this.viewJobs.bind(this)}>Schedule Request</button>:""}
						<h4>Scheduled Positions</h4>
						{this.state.subscription.contacts.ready() ? ev.jobs.map( (job)=>{
							return <JobSingle key={job.uid+job.job} job={job} parent={this} perm={perm} ev={ev} />
						}):""}
					</nav>
				</div>
				<div className="col-sm-9 col-lg-10">
					<header className="special container">
	          <h2>Event Workspace</h2>
	        </header>
					<div className="secondary sidebar">
						{/*}<input type="checkbox" ref="reoc" onClick={this.openReoccuring.bind(this)} checked={ev.reocurring} />*/}
						{perm?<ButtonPublish published={ev.published} eid={this.props.eid} />:<p>Published: {ev.published?"Published":"Not Published"}</p>}
						{/*}<ButtonDelete eid={this.props.eid} parent={this} />*/}

						{perm?<button onClick={this.openDelete.bind(this)}>Delete</button>:""}
						<EventDateControls ev={ev} perm={perm} />

						<EventLocation ev={ev} perm={perm} />
						<EventEVR ev={ev} perm={perm} />
						<EventReserved ev={ev} perm={perm} />

						<label>Tags</label>
						<EventTags ev={ev} subscription={this.state.subscription.options} perm={perm} />

					</div>
					<div className="panel panel-default">
						<div className="panel-heading">
						<EventName ev={ev} perm={perm} />
						<EventDescription ev={ev} perm={perm} />
						<EventWorkpad ev={ev} perm={perm} />
						</div>
					</div>
					<RequestWrapper eid={this.props.eid} parent={this} perm={perm} />
				</div>
			</div>

			</article>
		</div>
		)
	}
}
