import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import EventWorkspace from './EventWorkspace.jsx';
import MainBox from '../MainBox.jsx';
import WorkspacePanel from './WorkspacePanel.jsx';
import LoaderCircle from '../LoaderCircle.jsx';
import NoPerm from '../NoPerm.jsx';
import RecurringEventControl from './RecurringEventControl';
import EventImageControl from './components/EventImageControl';

import Event from '/lib/classes/Event.js';

export default class EventWorkspaceWrapper extends TrackerReact(React.Component) {
	constructor(props) {
    super(props);

    this.state = {
      subscription: {
        Event: Meteor.subscribe("thisEvent", props.eid, ()=>{this.setState({ready: true})}),
				tickets: Meteor.subscribe("eventTickets", props.eid),
				contacts: Meteor.subscribe("allContacts")
			},
			ready: false,
			submitted: false
    };

  }

  componentWillUnmount() {
    this.state.subscription.Event.stop();
		this.state.subscription.tickets.stop();
		this.state.subscription.contacts.stop();
		$("#RecurringModal").remove();
  }

	componentDidMount() {
		$('.tooltipped').tooltip({delay: 50});
	}

	request(event){
		event.preventDefault();
		Meteor.call("eventRequestPerm", this.props.eid, (error)=>{
			if(error){
				window.alert(error);
				console.error(error);
			}else{
				this.setState({submitted: true});
			}

		});
	}

	getEvent(){
		return new Event(Events.findOne(this.props.eid));
	}

	getSubheader(ev, perm){
		return (
			<ul>
				{perm&&<RecurringEventControl event={ev} />}
				{perm&&<EventImageControl event={ev} />}
			</ul>
		)
	}

	render() {
		if(!this.state.ready){
			return (<LoaderCircle />);
		}
		if(!checkPermission('events')){
			return <NoPerm />
		}
		let ev = this.getEvent();

		setDocumentTitle(ev.name);
		var perms = checkEventPermission(ev);
		if(!perms.view){
			return(<div className="center-align" style={{paddingTop:"50px"}}>
				<div className="card-panel">
					<div className="card-content">
						{!this.state.submitted?<p>You do not have permission to view this events workspace. Click <a href="" onClick={this.request.bind(this)}>here</a> to request permission to help with this event.</p>:<p>Submitted.</p>}

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
		let recurTrue = false;
		if (!!ev.recurId) {
			recurTrue = true;
			let recurId = ev.recurId;
		}
		return (
				<MainBox
					content={<EventWorkspace key={0} perm={perms.edit} ev={ev} />}
					subheader={this.getSubheader(ev, perms.edit)}
					showinfobar={true}
					infobar={<WorkspacePanel perms={perms} ev={ev} />}
				/>
		)
	}
}
