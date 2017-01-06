import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class MySchedule extends TrackerReact(React.Component) {
	constructor(){
		super();

	}

	accept(){
    Meteor.call("acceptJobRequest",this.props.job.evid, this.props.job.id);

  }

  decline(){
    Meteor.call("declineJobRequest",this.props.job.evid, this.props.job.id);

  }




	render() {

		// var job = this.props.ev.jobs.find(function(job){
		// 	return job.uid == Meteor.userId();
		// });
		let job = this.props.job;
		return (<li className="collection-item avatar">
      {job.status=="Pending"?
				<img src="icons/pending.png" alt="" className="circle"/>:
					<img src="icons/check.png" alt="" className="circle"/>}
      <span className="title">{job.job}</span>
      <p>{job.evname}
				{job.status=="Pending"?
					<a onClick={this.accept.bind(this)}
						className="right waves-effect waves-light btn green">Accept</a>
					:""}
				<a onClick={this.decline.bind(this)}
					className="right waves-effect waves-light btn red">Decline</a>
				{job.evlocation&&<br/>}
				{job.evlocation}
				<br/>
         {new moment(job.evstart.toISOString()).format("DD MMM @ h:mmA")}
      </p>

    </li>

		)
	}
}
