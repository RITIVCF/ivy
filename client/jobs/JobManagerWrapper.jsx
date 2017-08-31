import React from 'react';
import MainBox from '/client/MainBox.jsx';
import LoaderCircle from '/client/LoaderCircle.jsx';
import MaterialIcon from '/client/sharedcomponents/MaterialIcon.jsx';
import JobManager from './JobManager';

export default class JobManagerWrapper extends React.Component {
	constructor(){
		super();

		this.state = {
			jobs: [],
			subscription: {
				deletedUsers: Meteor.subscribe("deletedUsers", {
					onReady: () => {this.load()}
				})
			},
			loading: true,
			filter: {
				type: "",
				status: []
			}
		};

		this.load = this.load.bind(this);

	}

	componentWillUnmount(){
		this.state.subscription.deletedUsers.stop();
	}

	render(){
		return (
			<MainBox
        content={this.state.loading?<LoaderCircle />:this.getContent()}
        subheader={this.getSubHeader()}
        showinfobar={true}
        infobar={this.getInfoBar()}
			/>
		)
	}

	load(){
		this.setState({loading: true});
		let query = {};
		query.type = this.state.filter.type;
		query.status = {$in: this.state.filter.status};
		Meteor.call("getJobs", query , (error, jobs) => {
			this.setState({
				jobs: jobs,
				loading: false
			});
		});
	}

	getContent(){
		return (
			<JobManager
				jobs={this.state.jobs}
				onLoad={this.load}
				onToggleStatus={this.toggleStatus.bind(this)}
				onFilterChange={this.handleFilterChange.bind(this)}
			/>
		)
	}

	getSubHeader(){
		return (
			<Navbar>
				<NavbarItem onClick={this.load}>
					<MaterialIcon icon="refresh" className="black-text" />
				</NavbarItem>
				<NavbarItem onClick={this.getWork.bind(this)}>
					<MaterialIcon icon="archive" className="black-text" />
				</NavbarItem>
				<NavbarItem onClick={()=>{console.log(this.state)}}>
					<MaterialIcon icon="add" className="black-text" />
				</NavbarItem>
			</Navbar>
		)
	}

	getInfoBar(){
		return (
			<Row>
				<Column>
					This is infobar content.
				</Column>
			</Row>
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
        statuses.splice(array.indexOf(id), 1);
    }else{
        statuses.push(status);
    }
		this.setState({"filter.status": statuses});
	}

	handleFilterChange(newValue){
		this.setState({"filter.type": newValue});
	}
}
