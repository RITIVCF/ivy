import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ServiceRequestModal from './jobs/ServiceRequestModal.jsx';

import ButtonPublish from './components/ButtonPublish.jsx';
import ButtonDelete from './components/ButtonDelete.jsx';
import PermissionWindow from './permissions/PermissionWindow.jsx';
import DeleteEventWindow from './DeleteEventWindow.jsx';
//import JobsWindow from './jobs/JobsWindow.jsx';
//import JobSingle from './jobs/JobSingle.jsx';
import EventDateControls from './components/EventDateControls.jsx';
import EventLocation from './components/EventLocation.jsx';
import EventTags from './components/EventTags.jsx';
import EventEVR from './components/EventEVR.jsx';
import EventReserved from './components/EventReserved.jsx';


//export default class WorkspacePanel extends TrackerReact(React.Component) {
export default class WorkspacePanel extends React.Component {
	constructor(props) {
    super(props);

    this.state = {
    };
  }

	componentDidMount(){

	}

	viewJobs(){
		this.refs.servwindow.open();
	}

	openPerm(){
		this.refs.permwindow.open();
	}

	getLeader(){
		var user = Meteor.users.findOne(this.props.ev.owner);
		return user?user.name:"-";
	}

	openDelete(){
		event.preventDefault();
		//this.refs.deleteOverlay.openOverlay();
		if(window.confirm("Are you sure?\n\nTHIS CANNOT BE UNDONE.")){
			Meteor.call("deleteEvent", this.props.ev._id);
			Session.set("evselected","");
      FlowRouter.go("/events");
		}
	}


	render() {
		let ev = this.props.ev;
		let perm = this.props.perm;
		return (
			<div>
					{perm?
						<ButtonPublish published={ev.published} eid={ev._id} />
						:<p>Published: {ev.published?"Published":"Not Published"}</p>}
					{perm?<a className="btn red" onClick={this.openDelete.bind(this)}>Delete</a>:false}


				<EventDateControls eid={ev._id} start={ev.start} end={ev.end} perm={perm} />
				<div className="divider"/>
				<EventLocation ev={ev} perm={perm} />
				<EventEVR ev={ev} perm={perm} />
				<EventReserved ev={ev} perm={perm} />
				<h5>Event Types</h5>
				<EventTags ev={ev} perm={perm} />

				<div className="row" style={{marginTop: "1em"}}>
					{perm?<a className="btn"
						onClick={this.viewJobs.bind(this)}>Service Requests</a>:""}
					{/*}<ul className="collection">
						{ev.jobs.map( (job)=>{
							return <JobSingle key={job.uid+job.job} job={job} parent={this} perm={perm} ev={ev} />
						})}
					</ul>*/}
				</div>
					<ServiceRequestModal eid={this.props.ev._id} ref="servwindow"/>
					{Meteor.userId()==ev.owner&&<a className="btn" onClick={this.openPerm.bind(this)}>Permissions</a>}
					{Meteor.userId()==ev.owner ? <PermissionWindow ref="permwindow" parent={this} ev={ev} />:"Leader: "+this.getLeader()}
			</div>
		)
	}
}
