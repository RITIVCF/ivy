import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import moment from 'moment';

export default class EventPreview extends TrackerReact(React.Component) {
  openEvent(event){
    event.preventDefault();
  }

  renderContent() {
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


    console.log("Debrief: ", !this.props.event.debrief);
    console.log("Perm: ", checkPermission("admin")||this.props.event.owner==Meteor.userId());
    console.log("Published: ", this.props.event.published);
    console.log("Start: ", this.props.event.start < new Date());


    var perms = checkEventPermission(this.props.event);
    var isformopen = (this.props.event.start < new moment(new Date).add(2,"hours"));
    //console.log(perms);
    var leader = Meteor.users.findOne(this.props.event.owner);
    if(!this.props.event.name){
      return(
        <div>
          <p>Leader: {leader.name}<br/>{leader.emails[0].address}</p>
          <p>Date: {dateString}</p>
          <p>Time: {timeString}</p>
        </div>
      )
    }
    return (
      <div>
        <div>
          <h4>{this.props.event.name}</h4>
          <p>{this.props.event.description}</p>
          <p>Date: {dateString}</p>
          <p>Time: {timeString}</p>
        </div>
        <div>
          {(perms.edit||perms.view)?
            <a href={"/events/workspace/"+this.props.event._id} style={{width: "100%", margin: "10px 0px"}}
              className="waves-effect waves-light btn">
              {perms.edit?"Edit Event":"View Event"}
            </a>
            :<div></div>
          }
          {checkPermission('attendance')&&(this.props.event.published)&&isformopen?
          <a href={"events/attendance/"+this.props.event._id} style={{width: "100%", margin: "10px 0px"}}
            className="waves-effect waves-light btn">View Attendance</a>
          :<div></div>}
          {(this.props.event.published)&&isformopen?
            <a href={"/forms/signin/" + this.props.event._id} style={{width: "100%", margin: "10px 0px"}}
              className="waves-effect waves-light btn">Open Form</a>
            :<div></div>
          }
          {((!this.props.event.debrief)
            &&(checkPermission("admin")||this.props.event.owner==Meteor.userId())
            &&(this.props.event.published)
            &&(this.props.event.start < new Date()))?
            <a href={"events/debrief/edit/"+this.props.event._id} style={{width: "100%", margin: "10px 0px"}}
              className="waves-effect waves-light btn">Debrief</a>:false
          }
        </div>
      </div>
    );
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
    return (
      <div className='row'>
        <div className="col s12">
          {this.renderContent()}
        </div>
        {/*}<a href={"/forms/rsvp/"+ this.props.event._id}><button>RSVP</button></a>*/}
      </div>
    )
  }
}
