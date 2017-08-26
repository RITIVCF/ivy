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
				}),
			loading: true
			}
		}

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
		Meteor.call("getJobs", (error, jobs) => {
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
}
