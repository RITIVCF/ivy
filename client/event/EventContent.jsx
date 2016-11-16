import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import moment from 'moment';

export default class EventContent extends TrackerReact(React.Component) {
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


    var perms = checkEventPermission(this.props.event);
    console.log(perms);
    return (
      <div id={this.props.event._id} className="modal">
        <div className="modal-content">
          <h4>{this.props.event.name}</h4>
          <p>{this.props.event.description}</p>
          <p>Date: {dateString}</p>
          <p>Time: {timeString}</p>
        </div>
        <div className="modal-footer">
          {(perms.edit||perms.view)?
            <a href={"/events/workspace/"+this.props.event._id} className=" modal-action modal-close waves-effect waves-green btn-flat">
              {perms.edit?"Edit Event":"View Event"}
            </a>
            :<div></div>
          }
          {checkPermission('attendance')?
          <a href={"/attendance/event/"+this.props.event._id} className=" modal-action modal-close waves-effect waves-green btn-flat">View Attendance</a>
          :<div></div>}
          <a href={"/forms/signin/" + this.props.event._id} className=" modal-action modal-close waves-effect waves-green btn-flat">Open Form</a>
        </div>
      </div>
    );
  }

  go(){
    FlowRouter.go("/forms/signin/" + this.props.event._id);
  }

  render() {
    return (
      <div>
        {this.renderContent()}
        {/*}<a href={"/forms/rsvp/"+ this.props.event._id}><button>RSVP</button></a>*/}
      </div>
    )
  }
}
