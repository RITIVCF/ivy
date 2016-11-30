import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import ButtonPublish from './components/ButtonPublish.jsx';
import ButtonDelete from './components/ButtonDelete.jsx';
import PermissionWindow from './permissions/PermissionWindow.jsx';
import DeleteEventWindow from './DeleteEventWindow.jsx';
import JobsWindow from './jobs/JobsWindow.jsx';
import JobSingle from './jobs/JobSingle.jsx';
import EventDateControls from './components/EventDateControls.jsx';
import EventLocation from './components/EventLocation.jsx';
import EventTags from './components/EventTags.jsx';
import EventEVR from './components/EventEVR.jsx';
import EventReserved from './components/EventReserved.jsx';


export default class WorkspacePanel extends TrackerReact(React.Component) {
	constructor(props) {
    super(props);

    this.state = {
    };
  }

	viewPermissions(event){
		event.preventDefault();
  	this.refs.overlay.toggleOverlay();
  }

	viewJobs(event){
		event.preventDefault();
		this.refs.jobOverlay.toggleOverlay();
	}

	openDelete(){
		event.preventDefault();
		this.refs.deleteOverlay.openOverlay();
	}


	render() {
		let ev = this.props.ev;
		let perm = this.props.perm;
		return (
			<div>
				{perm?<JobsWindow ref="jobOverlay" eid={ev._id} />:""}
				{perm?<DeleteEventWindow ref="deleteOverlay" eid={ev._id} />:""}
				{Meteor.userId()==ev.owner ? <PermissionWindow ref="overlay" parent={this} ev={ev} />:""}
				{perm?
					<ButtonPublish published={ev.published} eid={this.props.eid} />
					:<p>Published: {ev.published?"Published":"Not Published"}</p>}
				{perm?<button className="btn btn-danger navbar-btn" onClick={this.openDelete.bind(this)}>Delete</button>:""}
				<EventDateControls ev={ev} perm={perm} />

				<EventLocation ev={ev} perm={perm} />
				<EventEVR ev={ev} perm={perm} />
				<EventReserved ev={ev} perm={perm} />
				<h3>Tags</h3>
				<EventTags ev={ev} subscription={this.props.subscription.options} perm={perm} />
				<h4>Service Positions</h4>
					{perm?<button className="btn btn-default navbar-btn"
						onClick={this.viewJobs.bind(this)}>Schedule Request</button>:""}
					{this.props.subscription.contacts.ready() ? ev.jobs.map( (job)=>{
						return <JobSingle key={job.uid+job.job} job={job} parent={this} perm={perm} ev={ev} />
					}):""}
			</div>
		)
	}
}
