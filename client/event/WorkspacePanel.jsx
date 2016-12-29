import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ServiceRequestModal from './ServiceRequestModal.jsx';

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

	componentDidMount(){
		$('.modal').modal();
	}

	// viewPermissions(event){
	// 	event.preventDefault();
  // 	this.refs.overlay.toggleOverlay();
  // }

	viewJobs(){
		this.refs.servwindow.open();
	}

	openPerm(){
		$("#permwindow").appendTo("body").modal('open');
	}

	openDelete(){
		event.preventDefault();
		//this.refs.deleteOverlay.openOverlay();
		if(window.confirm("Are you sure?\n\nTHIS CANNOT BE UNDONE.")){
			Meteor.call("deleteEvent", this.props.ev._id);
      FlowRouter.go("/events");
		}
	}


	render() {
		let ev = this.props.ev;
		let perm = this.props.perm;
		return (
			<div>
				{perm?<JobsWindow ref="jobOverlay" eid={ev._id} />:false}
				{perm?<DeleteEventWindow ref="deleteOverlay" eid={ev._id} />:false}
				{Meteor.userId()==ev.owner ? <PermissionWindow ref="overlay" parent={this} ev={ev} />:false}
					{perm?
						<ButtonPublish published={ev.published} eid={ev._id} />
						:<p>Published: {ev.published?"Published":"Not Published"}</p>}
					{perm?<a className="btn red" onClick={this.openDelete.bind(this)}>Delete</a>:false}


				<EventDateControls ev={ev} perm={perm} />

				<EventLocation ev={ev} perm={perm} />
				<EventEVR ev={ev} perm={perm} />
				<EventReserved ev={ev} perm={perm} />
				<h5>Event Tags</h5>
				<EventTags ev={ev} perm={perm} />

				<div className="row" style={{marginTop: "1em"}}>
					{perm?<a className="btn"
						onClick={this.viewJobs.bind(this)}>Service Requests</a>:""}
					<ul className="collection">
						{ev.jobs.map( (job)=>{
							return <JobSingle key={job.uid+job.job} job={job} parent={this} perm={perm} ev={ev} />
						})}
					</ul>
				</div>
					<ServiceRequestModal ev={this.props.ev} ref="servwindow"/>
					{Meteor.userId()==ev.owner&&<a className="btn" onClick={this.openPerm.bind(this)}>Permissions</a>}
			</div>
		)
	}
}
