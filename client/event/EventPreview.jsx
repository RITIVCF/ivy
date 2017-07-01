import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import moment from 'moment';
import { loadUser } from '/lib/classes/Contact.js';

export default class EventPreview extends TrackerReact(React.Component) {
  openEvent(event){
    event.preventDefault();
  }

  getDateTime() {
    dateString = "";
    var start = this.props.event.start;
    if (start != null) {
      if (start.hasOwnProperty("_isAMomentObject") && !start._isAMomentObject) {
        start = new moment(start);
      }
      try{
        dateString = start.format('dddd Do MMM YYYY');
      }
      catch(err) {
        start = new moment(start);
        dateString = start.format('dddd Do MMM YYYY');
      }


      end = this.props.event.end;
      try{
        end.format()
      }
      catch(err){
        end = new moment(end);
      }
      if (end != null) {
        if (end.hasOwnProperty("_isAMomentObject") && !end._isAMomentObject) {
          end = new moment(event.end);
        }
      } else {
        end = new moment(start).add(1, "hour");
      }

      isSameDay = true;

      if (start.diff(end, "day")) {
        isSameDay = false;
        dateString += " to " + end.format('dddd Do MMM YYYY');
      }
    }

    timeString = "";
    if (start != null) {
      if (isSameDay) {
        // Same day, keep it simple
        timeString = start.format("h:mm a");
        timeString += " - " + end.format("h:mm a");
      } else {
        // Different days, add days with time
        timeString = start.format("h:mm a MMM Do");
        timeString += " - " + end.format("h:mm a MMM Do");
      }
    }


    return (
			<div>
				<p>Date: {dateString}</p>
				<p>Time: {timeString}</p>
			</div>
		)

  }

  go(){
    FlowRouter.go("/forms/signin/" + this.props.event._id);
  }

  render() {
    if(!Session.get("evselected")){
      return <div className="row">
        <div className="col s12">
          <h2>Event Calendar</h2>
          <p>Select an event to continue...</p>
        </div>
      </div>
    }
    if(!this.props.event||!this.props.ready){
      return <div className="preloader-wrapper big active">
              <div className="spinner-layer spinner-blue-only">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div>
                <div className="gap-patch">
                  <div className="circle"></div>
                </div>
                <div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>
            </div>
    }

    let leader = loadUser(this.props.event.owner);

		if(!this.props.event.name){
      return(
        <div>
          <p>Leader: {leader.getName()}<br/>{leader.getEmail()}</p>
          {this.getDateTime()}
        </div>
      )
    }

		let perms = checkEventPermission(this.props.event);
    let isFormOpen = (this.props.event.published)&&(this.props.event.start < new moment(new Date).add(2,"hours"));
		let isUserOwner = leader._id==Meteor.userId();
		let isDebriefSubmitted = !!this.props.event.debrief;
		let hasPermissionToViewDebrief = (checkPermission("admin")||isUserOwner);
		let isEventPublished = this.props.event.published;
		let isPastEventStart = this.props.event.start < new Date();
		let canEditDebrief = (
			!isDebriefSubmitted&&
			hasPermissionToViewDebrief&&
			isEventPublished&&
			isPastEventStart
		);
		let canViewDebrief = (
			isDebriefSubmitted&&
			hasPermissionToViewDebrief&&
			isEventPublished&&
			isPastEventStart
		);
		let canViewAttendance = (
			checkPermission('attendance')&&
			isEventPublished&&
			isFormOpen
		);

		return (
      <div className='row'>
				<div className="col s12">
	        <div>
	          <h4>{this.props.event.name}</h4>
	          <p>{this.props.event.description}</p>
	          {this.getDateTime()}
	        </div>
	        <div>
	          {(perms.edit||perms.view)&&
	            <a href={"/events/workspace/"+this.props.event._id} style={{width: "100%", margin: "10px 0px"}}
							className="waves-effect waves-light btn">
	              {perms.edit?"Edit Event":"View Event"}
	            </a>
	          }
	          {canViewAttendance&&
							<a href={"events/attendance/"+this.props.event._id} style={{width: "100%", margin: "10px 0px"}}
	            className="waves-effect waves-light btn">View Attendance</a>
						}
	          {isFormOpen&&
	            <a href={"/forms/signin/" + this.props.event._id} style={{width: "100%", margin: "10px 0px"}}
							className="waves-effect waves-light btn">Open Form</a>
	          }
	          {canEditDebrief&&
							<a href={"events/debrief/edit/"+this.props.event._id} style={{width: "100%", margin: "10px 0px"}}
							className="waves-effect waves-light btn">Edit Debrief</a>
	          }
						{canViewDebrief&&
							<a href={"events/debrief/view/"+this.props.event._id} style={{width: "100%", margin: "10px 0px"}}
							className="waves-effect waves-light btn">View Debrief</a>
						}
	        </div>
	      </div>
			</div>
    );
  }
}
