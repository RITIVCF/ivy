import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ScheduleItem from './ScheduleItem.jsx';
import LoaderCircle from '../LoaderCircle.jsx';

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

	getJobs(){
		//console.log(Events.find({"jobs.uid": Meteor.userId(), end: {$gte: new Date()}, "jobs.status": {$ne: "Declined"}}).fetch());
		var jobs = [];
		var evs = Events.find({"jobs.uid": Meteor.userId(), end: {$gte: new Date()}, "jobs.status": {$ne: "Declined"}}).fetch();
		evs.forEach((ev)=>{
			ev.jobs.filter((job)=>{
				return job.uid==Meteor.userId();
			}).forEach((job)=>{
				job.evid=ev._id;
				job.evname=ev.name;
				job.evstart=ev.start;
				job.evlocation=ev.location;
				jobs.push(job);
			});
		});
		console.log(jobs);
		return jobs;
	}


	render() {

		return (
			<div className="card">
				<div className="card-content">
					<span className="card-title">My Schedule</span>
						{!this.state.subscription.events.ready()?
						<LoaderCircle />:
						<ul className="collection">
							{(this.getJobs().length!=0)?this.getJobs().map((job)=>{
								return <ScheduleItem key={job.id} job={job} />
							}):<li className="collection-item">You have no upcoming scheduled service positions.</li>}

					  </ul>}
				</div>
			</div>
		)
	}
}
