import React, {Component} from 'react';

export default class EventSingle extends Component {
  constructor(props){
    super(props);
    this.state={
      job: props.ev.jobs.find(function(job){
        return job.uid == Meteor.userId();
      })
    };
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
    // This area needs styled, so however we need to do it to style
    // it correctly. Review Alex's mock ups and Jeanie's drawings.-->
    var job = this.props.ev.jobs.find(function(job){
      return job.uid == Meteor.userId();
    });
    return (
      <div className="panel panel-default">
      {/*}  {(Meteor.userId() == this.props.job.submittedby)||(Meteor.userId() == this.props.ev.owner) ?*/}
         {/*}: ""} */}
         {job.status == "Pending" ? <div>
            <button className="btn btn-success" onClick={this.accept.bind(this)}>Accept</button>
            <button className="btn btn-danger" onClick={this.decline.bind(this)}>Decline</button>
          </div>:""}
          {job.status == "Accepted" ?
          <button className="btn btn-danger" onClick={this.decline.bind(this)}>Decline</button>:""}

        <div>{job.status}</div>
        <div>{this.props.ev.name}</div>
        <div>{job.job}</div>
      </div>

    )
  }
}
