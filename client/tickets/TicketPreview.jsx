import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

// props:
//    tkt:  ticket

export default class TicketsPreview extends TrackerReact(React.Component) {
  constructor(){
    super();

  }

  getUser(){
    if(this.props.tkt.assigneduser==""){
      return {name:""};
    }
    return Meteor.users.findOne({_id:this.props.tkt.assigneduser});
  }

  getGroup(){
    return Groups.findOne(this.props.tkt.assignedgroup);
  }

  getCust(){
    if(this.props.tkt.customer==""){
      return {name: ""};
    }
    if(this.props.tkt.type == "Contact"){
      return {name: ""};
    }
    return Meteor.users.findOne({_id:this.props.tkt.customer});
  }

  go(){
    FlowRouter.go("/tickets/"+ this.props.tkt._id);
  }

  render() {
    let tkt = this.props.tkt;

    if(!tkt){
      return <p>Please select a ticket to view the details...</p>
    }
    var activities = tkt.activities.reverse();
    return (
      <div>
        <a className="waves-effect waves-light btn"
          onClick={this.go.bind(this)} >Open Ticket</a>
        <p><b>Ticket #:</b> {tkt.ticketnum}</p>
        <p><b>Subject:</b> {tkt.subject}</p>
        <p><b>For:</b> {this.getCust().name}</p>
        <p><b>Type:</b> {tkt.type}</p>
        <p>{tkt.ereqtype}</p>
        <p><b>Assigned To:</b> {this.getUser().name}</p>
        <p><b>Assigned Group:</b> {tkt.assignedgroup?this.getGroup().name:""}</p>
        <p><b>Status:</b> {tkt.status}</p>
        <p><b>Last Updated:</b> {new moment(tkt.lastUpdated).format("MM/DD/YY hh:mmA")}</p>
        <h5>Recent Activites</h5>
        {activities.map((activity, i)=>{
          if(i>2){
            return <div key={i}></div>
          }
          return <div key={i} className="card">
						<div className="card-content">
							<span className="card-title">Type: {activity.type}</span>
							<p>{activity.desc}<br/>
								{new moment(activity.createdAt.toISOString()).format("DD MMM @ h:mmA")}</p>
						</div>
					</div>
        })}
      </div>
    )
  }
}
