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
      <img src="images/d.png" alt="" className="circle"/>
      <span className="title">{this.props.ev.name}</span>
      <p>{this.prop.ev.location}
				{job.status=="Pending"?
					<a onClick={this.accept.bind(this)}
						className="right waves-effect waves-light btn green">Accept</a>
					:""}
				<a onClick={this.decline.bind(this)}
					className="right waves-effect waves-light btn red">Decline</a>
				<br/>
         Date/Time
      </p>

    </li>

		)
	}
}
