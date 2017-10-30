import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import MainBox from '/client/MainBox.jsx';
import MaterialIcon from '/client/sharedcomponents/MaterialIcon.jsx';
import JobManagerListContainer from './JobManagerListContainer';
import JobManagerFilter from './JobManagerFilter';
import { isSendMailGateOpen } from '/lib/jobs.js';

export default class JobManagerWrapper extends TrackerReact(React.Component) {
	constructor(){
		super();

		this.state = {
			type: ""
		};

		if(Session.get("jobstatusfilter")===undefined){
			Session.set("jobstatusfilter", []);
		}

	}

	getStatus(){
		const sessionStatus = Session.get("jobstatusfilter");
		if ( !sessionStatus ) {
			return [];
		} else {
			return sessionStatus;
		}
	}

	render(){
		const { type } = this.state;
		const status = this.getStatus();
		console.log("rendering: ", {
			type: type,
			status: status
		});
		return (
			<MainBox
        subheader={this.getSubHeader()}
        showinfobar={true}
        infobar={this.getInfoBar()}
			>
				<div>
					<JobManagerFilter
						activeStatuses={status}
						activeFilter={type}
						onToggleStatus={this.toggleStatus.bind(this)}
						onFilterChange={this.handleFilterChange.bind(this)}
					/>
					<JobManagerListContainer type={type} status={status} />
				</div>
			</MainBox>
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

	toggleStatus( status ){
		let statuses = Session.get("jobstatusfilter");
		if ( statuses.includes(status) ) {
        statuses.splice(statuses.indexOf(status), 1);
    } else {
        statuses.push(status);
    }
		Session.set("jobstatusfilter", statuses);
		// this.setState({status: statuses},()=>{this.forceUpdate()});
	}

	handleFilterChange( newValue ){
		this.setState({type: newValue});
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
