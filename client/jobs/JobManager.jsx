import React from 'react';
import { getUser } from '/lib/users.js';
import MaterialCollection from '/client/sharedcomponents/MaterialCollection/MaterialCollection.jsx';

export default class JobManager extends React.Component {
	constructor(){
		super();

	}

	render(){
		return (
			<Row>
				<Column>
					{
						this.getOtherJobs().map( (job) => {
							console.log(job);
							return <Job key={job._id} job={job} onCancel={this.props.onLoad} onRestart={this.props.onLoad} />
						})
					}
					<hr />
					{
						this.getFailedJobs().map( (job) => {
							console.log(job);
							return <Job key={job._id} job={job} onCancel={this.props.onLoad} onRestart={this.props.onLoad} />
						})
					}
					<hr />
					{
						this.getRunningJobs().map( (job) => {
							console.log(job);
							return <Job key={job._id} job={job} onCancel={this.props.onLoad} onRestart={this.props.onLoad} />
						})
					}
					<hr />
					{
						this.getWaitingJobs().map( (job) => {
							console.log(job);
							return <Job key={job._id} job={job} onCancel={this.props.onLoad} onRestart={this.props.onLoad} />
						})
					}
				</Column>
			</Row>
		)
	}

	getWaitingJobs(){
		return this.props.jobs.filter(job=>job.status=="waiting");
	}

	getRunningJobs(){
		return this.props.jobs.filter(job=>job.status=="running");
	}

	getFailedJobs(){
		return this.props.jobs.filter(job=>job.status=="failed");
	}

	getOtherJobs(){
		return this.props.jobs.filter(job=>!["waiting", "running", "failed", "cancelled"].includes(job.status));
	}
}


class Job extends React.Component {
	constructor(){
		super();

		this.handleCancelClick = this.cancelJob.bind(this);
		this.handleRestartClick = this.restartJob.bind(this);
	}

	render(){
		const job = this.props.job;
		const hasUser = !!job.data.uid;
		let user;
		if ( hasUser ) {
			user = getUser(job.data.uid);
		}
		return (
			<Card title={job.type}>
				<Row>
					<Column width="s6">
						<Row>
							<p><b>_id:</b> {job._id}</p>
							<p><b>Status:</b> {job.status}</p>
							{hasUser&&<p><b>User:</b> {user.getName()}</p>}
							<p><b>After:</b> {dateFormat(job.after)}</p>
							<p><b>Created:</b> {dateFormat(job.created)}</p>
						</Row>
						<Row>
							<Button
								onClick={this.handleCancelClick}
							>
								Cancel Job
							</Button>
						</Row>
						<Row>
							<Button
								onClick={this.handleRestartClick}
							>
								Restart Job
							</Button>
						</Row>
					</Column>
					<Column width="s6">
						{/* <label>Log</label> */}
						<MaterialCollection
							values={this.getLog()}
						/>
						{/* level, message, time  */}
					</Column>
				</Row>
			</Card>
		)
	}

	getLog(){
		let log = [];

		this.props.job.log.forEach((logEntry)=>{
			log.push([
				<p key="1"><b>Level:</b> {logEntry.level}</p>,
				<p key="2"><b>Time:</b> {dateFormat(logEntry.time, "YYYY-MM-D HH:mm:ss:SSS")}</p>,
				<p key="3"><b>Message:</b> {logEntry.message}</p>
			])
		});

		return log;
	}

	cancelJob(){
		Meteor.call("cancelJob", this.props.job._id, (error)=> {
			if(error){
				console.error("Problem in cancelJob: ", error);
			}
		});
		this.props.onCancel();
	}

	restartJob(){
		Meteor.call("restartJob", this.props.job._id, (error)=> {
			if(error){
				console.error("Problem in restartJob: ", error);
			}
		});
		this.props.onRestart();
	}

}
