import React from 'react';
import { getUser } from '/lib/users.js';
import LoaderCircle from '/client/LoaderCircle.jsx';
import Checkbox from '/client/contact/Checkbox.jsx';
import MaterialCollection from '/client/sharedcomponents/MaterialCollection/MaterialCollection.jsx';

export default class JobManager extends React.Component {
	constructor(){
		super();

		this.state = {
			statuses: ["completed", "waiting", "paused", "ready", "running", "failed", "cancelled"]
		}

	}

	render(){
		return (
			<Row>
				<Column>
					<Card>
						<CardContent>
							<Row>
								<Column width={"s6"}>
									{this.state.statuses.map((status)=>{
										return <Checkbox key={status}
											label={status}
											onChange={this.handleCheck.bind(this, status)}
											checked={this.props.activeStatuses.includes(status)} />
									})}
								</Column>
								<Column width={"s6"}>
									<select onChange={this.handleFilterChange.bind(this)} value={this.props.activeFilter} className="browser-default">
										<option value="">Select a Job Type</option>
										<option value="sendEmail">Send Email</option>
										<option value="sendNewsletter">Send Newsletter</option>
										<option value="sendEventFollowUpEmail">Send Event Follow Up</option>
										<option value="checkFunnelStatus">Check Funnel Status</option>
										<option value="processExpiredContacts">Process Expired Contacts</option>
									</select>
								</Column>
							</Row>


						</CardContent>
					</Card>
					{
						this.getJobs().map( (job) => {
							return <Job key={job._id} job={job} onCancel={this.props.onLoad} onRestart={this.props.onLoad} />
						})
					}
				</Column>
			</Row>
		)
	}

	getJobs(){
		return this.props.jobs;
	}

	handleCheck(status){
		this.props.onToggleStatus(status);
	}

	handleFilterChange(event){
		this.props.onFilterChange(event.target.value);
	}


}


class Job extends React.Component {
	constructor(){
		super();

		this.state = {
			loading: false
		}

		this.actions = {
			waiting: ["Cancel","Pause","Ready"],
			ready: ["Cancel","Pause"],
			paused: ["Cancel","Resume"],
			running: ["Cancel"],
			cancelled: ["Remove","Restart"],
			failed: ["Remove","Restart"],
			completed: ["Rerun"]
		};

		this.methods = {
			Remove: "removeJob",
			Cancel: "cancelJob"	,
			Pause: "pauseJob",
			Resume: "resumeJob",
			Restart: "restartJob",
			Ready: "readyJob",
			Rerun: "rerunJob"
		}
	}

	render(){
		const job = this.props.job;
		const hasUser = !!job.data.uid;
		const isSendEmail = job.type == "sendEmail";
		const actions = this.actions[job.status]; //Returns array
		let user;
		if ( hasUser ) {
			user = getUser(job.data.uid);
		}
		if ( isSendEmail ){
			const recipient = getUser({"emails.address": job.data.email.to});
		}
		return (
			<Card title={job.type}>
				<Row>
					<Column width="s6">
						<Row>
							<p><b>_id:</b> {job._id}</p>
							<p><b>Status:</b> {job.status}</p>
							{hasUser&&<p><b>User:</b> {user.getName()}</p>}
							{recipient&&<p><b>Recipient: </b>{recipient.getName()}</p>}
							{isSendEmail&&<p>
								<b>Email: </b>
								{recipient?recipient.getEmail():job.data.email.to}
							</p>
							}
							<p><b>After:</b> {dateFormat(job.after)}</p>
							<p><b>Created:</b> {dateFormat(job.created)}</p>
						</Row>

						{
							this.state.loading?
								<LoaderCircle />
							:
							actions.map( (action) => {
								return <Row key={action}><Button onClick={()=>{this.handleClick(action)}}>{action} Job</Button></Row>
							})
						}

					</Column>
					<Column width="s6">
						<MaterialCollection
							values={this.getLog()}
						/>
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

	handleClick(action){
		this.setState({loading: true});
		const method = this.methods[action];
		Meteor.call(method, this.props.job._id, (error) => {
			if(error){
				console.error("Problem performing action " + action + " on job: ", error);
				window.alert("Problem performing action " + action + " on job. View log for details.");
			}
			this.setState({loading: false});
		});
	}


}
