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
		return {name: ""};
	}

	remove(){
		if(window.confirm("Are you sure?")){
			Meteor.call("deleteJobRequest", this.props.eid, this.props.job);
		}
	}

	render() {
		let job = this.props.job;
		if(job.isRequest){
			return (
				<li className="collection-item avatar">
					<img src="/images/accepted.png" alt="" className="circle"/>
					<span className="title">{job.job}</span>
					<p>{this.getUser().name}<br/><a className="secondary-content" onClick={this.remove.bind(this)}><i className="material-icons">close</i></a>
					{this.props.job.status}
					</p>
				</li>
			)
		}
		else{
			return(
				<li className="collection-item">
					<span className="title">{job.job}</span>
					<p>{this.getUser().name}<a className="secondary-content" onClick={this.remove.bind(this)}><i className="material-icons">close</i></a>
					</p>
				</li>
			)
		}

	}
}
