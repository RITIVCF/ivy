import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

// props:
//    tkt:  ticket

export default class TicketsPreview extends TrackerReact(React.Component) {
  constructor(props){
    super(props);


  }

  getUser(){
    //console.log(this);
    if(this.props.tkt.assigneduser==""){
      return {name:""};
    }
    return Contacts.findOne({_id:
        Meteor.users.findOne({_id:this.props.tkt.assigneduser}).contact}
      );
  }

  getGroup(){
    return Groups.findOne(this.props.tkt.assignedgroup);
  }

  getCust(){
    if(this.props.tkt.customer==""){
      return {name: ""};
    }
    if(this.props.tkt.type == "Contact"){
      return {name: ""};//Contacts.findOne(this.props.tkt.customer).name;
    }
    return Contacts.findOne({_id:
        Meteor.users.findOne({_id:this.props.tkt.customer}).contact
      });
  }

  go(){
    FlowRouter.go("/tickets/"+ this.props.tkt._id);
    //this.props.parent.editTicket(this.props.tkt._id);
  }

  render() {
    let tkt = this.props.tkt;
    if(!tkt){
      return <h4>Ticket Dashboard</h4>
    }
    var activities = tkt.activities.reverse();
    return (
      <div>
        <a className="waves-effect waves-light btn"
          onClick={this.go.bind(this)} >Open Ticket</a>
        <p>Ticket #: {tkt.ticketnum}</p>
        <p>Subject: {tkt.subject}</p>
        <p>For: {this.getCust().name}</p>
        <p>Type: {tkt.type}</p>
        <p>{tkt.ereqtype}</p>
        <p>Assigned To: {this.getUser().name}</p>
        <p>Assigned Group: {tkt.assignedgroup?this.getGroup().name:""}</p>
        <p>Status: {tkt.status}</p>
        <p>Last Updated: {new moment(tkt.lastUpdated).format("MM/DD/YY hh:mmA")}</p>
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
