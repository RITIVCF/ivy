import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';


export default class SinglePosition extends Component {
	constructor(props) {
    super(props);

    this.state = {

    };
  }

	getUser(){
		var user = Meteor.users.findOne(this.props.job.uid);
		if(user){
			return user;
		}
		return {name: "Unfilled"};
	}

	remove(){   //Make sure this knows how to remove only the one.
		if(window.confirm("Are you sure?")){
			Meteor.call("deleteJobRequest", this.props.eid, this.props.job);
		}
	}

	render() {
		let job = this.props.job;
		if(job.isRequest){
			return (
				<li className="collection-item avatar">
					{job.status=="Pending"&&<img src="/icons/pending.png" alt="" className="circle"/>}
					{job.status=="Accepted"&&<img src="/icons/check.png" alt="" className="circle"/>}
					{job.status=="Declined"&&<img src="/icons/decline.png" alt="" className="circle"/>}
					<span className="title"><b>{job.job}</b></span>
					<p>{this.getUser().name}<br/><a className="secondary-content" onClick={this.remove.bind(this)}><i className="material-icons">close</i></a>
					{this.props.job.status}
					</p>
				</li>
			)
		}
		else{
			return(
				<li className="collection-item avatar">
					<a className="secondary-content" onClick={this.remove.bind(this)}><i className="material-icons">close</i></a>
					<span className="title"><b>{job.job}</b></span>
					<p>{this.getUser().name}
					</p>
				</li>
			)
		}

	}
}
