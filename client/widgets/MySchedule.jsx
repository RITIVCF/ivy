import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ScheduleItem from './ScheduleItem.jsx';

export default class MySchedule extends TrackerReact(React.Component) {
	constructor(){
		super();

		this.state = {
			subscription: {
				events: Meteor.subscribe("mySchedule")
			}
		}

	}

	componentWillUnmount(){
		this.state.subscription.events.stop();
	}

	accept(){
    Meteor.call("acceptJobRequest", this.props.ev._id, this.props.ev.jobs.find(function(job){
      return job.uid == Meteor.userId();
    }));

  }

  decline(){
    Meteor.call("declineJobRequest", this.props.ev._id, this.props.ev.jobs.find(function(job){
      return job.uid == Meteor.userId();
    }));

  }

	getEvents(){
		console.log(Events.find({"jobs.uid": Meteor.userId(), end: {$gte: new Date()}, "jobs.status": {$ne: "Declined"}}).fetch());
		return Events.find({"jobs.uid": Meteor.userId(), end: {$gte: new Date()}, "jobs.status": {$ne: "Declined"}}).fetch();
	}


	render() {
		return (
			<div className="card">
				<div className="card-content">
					<span className="card-title">My Schedule</span>
						<ul className="collection">
							{this.state.subscription.events.ready()?(this.getEvents().length!=0)?this.getEvents().map((event)=>{
								return <ScheduleItem key={event._id} ev={event} />
							}):<li className="collection-item">You have no upcoming scheduled service positions.</li>
							:<div></div>}

					  </ul>
				</div>
			</div>
		)
	}
}
