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
		return (

		<div>
			<JobsWindow ref="jobOverlay" eid={ev._id} />
			<DeleteEventWindow ref="deleteOverlay" eid={ev._id} />
			{/*}<ReoccuringEventWindow ref="reoccuringOverlay" ev={ev} /> */}
			{Meteor.userId()==ev.owner ? <PermissionWindow ref="overlay" parent={this} ev={ev} />:""}
			<article id="main">
        <header className="special container">
          <h2>Event Workspace</h2>
        </header>
			<div className="sidebar">
				{Meteor.userId()==ev.owner ? <input type="button" onClick={this.viewPermissions.bind(this)} value="Permissions" />:""}
				<button onClick={this.viewJobs.bind(this)}>Schedule Request</button>
				<h4>Scheduled Positions</h4>
				{this.state.subscription.contacts.ready() ? ev.jobs.map( (job)=>{
					return <JobSingle key={job.uid+job.job} job={job} parent={this} ev={ev} />
				}):""}
			</div>
			<div className="secondary sidebar">
				{/*}<input type="checkbox" ref="reoc" onClick={this.openReoccuring.bind(this)} checked={ev.reocurring} />*/}
				<ButtonPublish published={ev.published} eid={this.props.eid} />
				{/*}<ButtonDelete eid={this.props.eid} parent={this} />*/}

				<button onClick={this.openDelete.bind(this)}>Delete</button>
				<EventDateControls ev={ev} />

				<EventLocation ev={ev} />
				<EventEVR ev={ev} />
				<EventReserved ev={ev} />

				<label>Tags</label>
				<EventTags ev={ev} subscription={this.state.subscription.options} />

			</div>
			<div className="Workspace">
					<EventName ev={ev} />
					<EventDescription ev={ev} />
					<EventWorkpad ev={ev} />
			</div>
				<RequestWrapper eid={this.props.eid} parent={this} />
			</article>
		</div>
		)
	}
}
