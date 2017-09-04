import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import MainBox from '/client/MainBox.jsx';
import LoaderCircle from '/client/LoaderCircle.jsx';
import MaterialIcon from '/client/sharedcomponents/MaterialIcon.jsx';
import JobManager from './JobManager';
import { isSendMailGateOpen } from '/lib/jobs.js';

export default class JobManagerWrapper extends TrackerReact(React.Component) {
	constructor(){
		super();

		this.state = {
			jobs: [],
			subscription: {
				deletedUsers: Meteor.subscribe("deletedUsers"),
				jobs: Meteor.subscribe("jobCollection")
			},
			loading: true,
			filter: {
				type: "",
				status: []
			}
		};

	}

	componentWillUnmount(){
		this.state.subscription.deletedUsers.stop();
		this.state.subscription.jobs.stop();
	}

	render(){
		let loading = true;
		if(this.state.subscription.jobs.ready()){
			loading = false;
		}
		return (
			<MainBox
        content={loading?<LoaderCircle />:this.getContent()}
        subheader={this.getSubHeader()}
        showinfobar={true}
        infobar={this.getInfoBar()}
			/>
		)
	}

	load(){
		let query = {};
		if(this.state.filter.type){
			query.type = this.state.filter.type;
		}
		query.status = {$in: this.state.filter.status};
		return jobCollection.find(query, {sort: {after: 1}}).fetch();
	}

	getContent(){
		const jobs = this.load();
		return (
			<JobManager
				jobs={jobs}
				activeStatuses={this.state.filter.status}
				activeFilter={this.state.filter.type}
				onLoad={this.load}
				onToggleStatus={this.toggleStatus.bind(this)}
				onFilterChange={this.handleFilterChange.bind(this)}
			/>
		)
	}

	getSubHeader(){
		return (
			<Navbar>
				
			</Navbar>
		)
	}

	getInfoBar(){
		return (
			<JobManagerPanel />
		)
	}

	getWork(){
		Meteor.call("getWork", 'testJobError', (error, result)=>{
			if(error){
				console.error("Problem in testQueue: ", error);
			} else {
				console.log("Result: ", result);
			}

		});
	}

	toggleStatus(status){
		let statuses = this.state.filter.status;
		if(statuses.includes(status)){
        statuses.splice(statuses.indexOf(status), 1);
    }else{
        statuses.push(status);
    }
		let filter = this.state.filter;
		filter.status = statuses;
		this.setState({"filter": filter});
	}

	handleFilterChange(newValue){
		let filter = this.state.filter;
		filter.type = newValue;
		this.setState({"filter": filter});
	}
}



class JobManagerPanel extends TrackerReact(React.Component) {
	constructor(){
		super();

		this.openGate = this.openGate.bind(this);
		this.closeGate = this.closeGate.bind(this);

	}

	render(){
		const isOpen = isSendMailGateOpen();
		return (
			<Row>
				<Column>
					Send Mail Gate Status: {this.getStatusChip(isOpen)}
					{
						isOpen ?
							<Button
								onClick={this.closeGate}>
								Close Gate
							</Button>
						:
						<Button
							onClick={this.openGate}>
							Open Gate
						</Button>
					}
				</Column>
			</Row>
		)
	}

	isGateOpen(){
		const statusObj = Options.findOne("emailqueuestatus");
		if(statusObj){
			return statusObj.open;
		} else {
			return false;
		}
	}

	getStatusChip(isOpen){
		let statusMessage = "Closed";
		let color = "Red";
		if(isOpen){
			statusMessage = "Open";
			color = "Green";
		}

		return <Chip color={color}><span className="white-text">{statusMessage}</span></Chip>
	}

	closeGate(){
		Meteor.call("closeSendMailGate");
	}

	openGate(){
		Meteor.call("openSendMailGate");
	}

}
