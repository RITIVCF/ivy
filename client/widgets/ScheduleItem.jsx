import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class MySchedule extends TrackerReact(React.Component) {
	constructor(){
		super();

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




	render() {

		var job = this.props.ev.jobs.find(function(job){
			return job.uid == Meteor.userId();
		});
		return (<li className="collection-item avatar">
      {job.status=="Pending"?
				<img src="images/pending.png" alt="" className="circle"/>:
					<img src="images/accepted.png" alt="" className="circle"/>}
      <span className="title">{job.job}</span>
      <p>{this.props.ev.name}
				{job.status=="Pending"?
					<a onClick={this.accept.bind(this)}
						className="right waves-effect waves-light btn green">Accept</a>
					:""}
				<a onClick={this.decline.bind(this)}
					className="right waves-effect waves-light btn red">Decline</a>
				<br/>
				{this.props.ev.location}
				<br/>
         {new moment(this.props.ev.start.toISOString()).format("DD MMM @ h:mmA")}
      </p>

    </li>

		)
	}
}
