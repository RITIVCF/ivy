import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import EventWorkspace from './EventWorkspace.jsx';
import MainBox from '../MainBox.jsx';
import WorkspacePanel from './WorkspacePanel.jsx';
import LoaderCircle from '../LoaderCircle.jsx';
import NoPerm from '../NoPerm.jsx';
import Modal from '../sharedcomponents/Modal.jsx';
import RecurringModal from './RecurringModal.jsx';
import {anyUnpublishedRecurring} from '/lib/events.js';
import EventImageControl from './components/EventImageControl';

import Event from '/lib/classes/Event.js';

export default class EventWorkspaceWrapper extends TrackerReact(React.Component) {
	constructor(props) {
    super(props);
		var thiz = this;
    this.state = {
      subscription: {
        Event: Meteor.subscribe("thisEvent", props.eid, function(){thiz.setState({ready: true})}),
				tickets: Meteor.subscribe("eventTickets", props.eid),
				contacts: Meteor.subscribe("allContacts")
		},
		groups: getUserGroupPermission(),
		ready: false,
		submitted: false,
		enddate: new Date(),
		recurGroup: false
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

	repeatEvent() {
		$("#RecurringModal").appendTo("body").modal("open");
	}

	componentDidUpdate() {
		$('#RecurringModal').modal();
	}

	cancelRecur() {
		console.log("Close recurring modal");
		try {
			$('#RepeatEventModal').modal('close');
		} catch (e) {

		}

	}

	closeRecur() {
		// for refresh 2
	}

	setRepeat() {
		if (this.state.recurGroup) {
			Meteor.call('createEventRecurrence', this.getEvent()._id, this.state.enddate, this.state.recurGroup._id, (error) => {
				if(error) {
					Materialize.toast("There was an error creating the recurring events", 2000);
				} else {
					Materialize.toast("Created recurring events", 2000);
				}
			});
		} else if (this.getEvent().tags.includes("Small Group")) {
			Materialize.toast("Associated small group is required", 2000);
		} else {
			Meteor.call('createEventRecurrence', this.getEvent()._id, this.state.enddate, this.state.recurGroup._id, (error) => {
				if(error) {
					Materialize.toast("There was an error creating the recurring events", 2000);
				} else {
					Materialize.toast("Created recurring events", 2000);
				}
			});
		}
	}

	publishAllRecur() {
		Meteor.call('publishAllRecurEvents', this.getEvent()._id, (error) => {
			if(error) {
				Materialize.toast("There was an error publishing all recurring events", 2000);
			} else {
				Materialize.toast("Published all recurring events", 2000);
			}
		});
	}

	unpublishAllRecur() {
		Meteor.call('unpublishAllRecurEvents', this.getEvent()._id, (error) => {
			if(error) {
				Materialize.toast("There was an error unpublishing all recurring events", 2000);
			} else {
				Materialize.toast("Unpublished all recurring events", 2000);
			}
		});
	}

	deleteAllRecur() {
		let result = window.confirm("Are you sure you want to delete all recurring events? *This action cannot be undone.*");
    if(result == true){
			Meteor.call('deleteAllRecurEvents', this.getEvent()._id, (error) => {
				if(error) {
					Materialize.toast("There was an error deleting all recurring events", 2000);
				} else {
					Session.set("evselected","");
					routeTo("events");
				}
			});
		}
	}

	request(event){
		event.preventDefault();
		var thiz = this;
		Meteor.call("eventRequestPerm", this.props.eid, function(error){
			if(error){
				window.alert(error);
				console.error(error);
			}else{
				thiz.setState({submitted: true});
			}

		});
	}

	getEvent(){
		return new Event(Events.findOne(this.props.eid));
	}

	checkGroup(id){
		return this.state.groups.indexOf(id)>-1;
	}

	getSubheader(ev, perm){
		return (
			<ul>
				<li>
					<a className="tooltipped" data-position="bottom" data-delay="50" data-tooltip="Set recurrence" onClick={this.repeatEvent.bind(this)}>
						<i className="material-icons black-text">content_copy</i>
					</a>
				</li>
				<EventImageControl key={2} ref="" ev={ev} perm={perm} />
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
					content={[<EventWorkspace key={0} perm={perms.edit} ev={ev} />,
					<div id="RecurringModal" key={1} className={recurTrue?"modal":"modal modal-fixed-footer"}>
	          <div className="modal-content">
	            {recurTrue?<div>{
								anyUnpublishedRecurring(ev.recurId)?<a className="btn" onClick={this.publishAllRecur.bind(this)}>Publish All</a>:
								<a className="btn" onClick={this.unpublishAllRecur.bind(this)}>Unpublish All</a>
							}
								<a className="btn red" onClick={this.deleteAllRecur.bind(this)}>Delete All</a>
							</div>:
							<RecurringModal ev={ev} perm={perms.edit} defaultEndDate={this.state.enddate} group={(newValue) => {this.setState({recurGroup: newValue})}} onpick={(newValue) => {this.setState({enddate: newValue})}} />}
	          </div>
	          <div className="modal-footer">
							{recurTrue?<div>

							</div>:<div>
								<a className="btn" onClick={this.setRepeat.bind(this)}>Repeat</a>
							</div>
							}
	          </div>
		      </div>
					]}
					subheader={this.getSubheader(ev, perms.edit)}
					showinfobar={true}
					infobar={<WorkspacePanel perms={perms} ev={ev} />}
				/>
		)
	}
}

/*
	<Modal
		key={1}
		id={"RepeatEventModal"}
		ref="modal"
		content={recurTrue?<div>{
			anyUnpublishedRecurring(ev.recurId)?<a className="btn" onClick={this.publishAllRecur.bind(this)}>Publish All</a>:
			<a className="btn" onClick={this.unpublishAllRecur.bind(this)}>Unpublish All</a>
		}
			<a className="btn red" onClick={this.deleteAllRecur.bind(this)}>Delete All</a>
		</div>:
		<RecurringModal ev={ev} perm={perms.edit} defaultEndDate={this.state.enddate} group={(newValue) => {this.setState({recurGroup: newValue})}} onpick={(newValue) => {this.setState({enddate: newValue})}} />}



		onClose={this.closeRecur.bind(this)}
		type={recurTrue?'':"fixed-footer"}
		footer={recurTrue?<div>
			<a className="btn modal-action modal-close" ref="closebtn" onClick={this.cancelRecur.bind(this)}>Close</a>
		</div>:<div>
			<a className="btn" onClick={this.setRepeat.bind(this)}>Repeat</a>
			<a className="btn red" onClick={this.cancelRecur.bind(this)}>Cancel</a>
		</div>
		}
	/>


	*/
