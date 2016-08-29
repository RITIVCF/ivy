import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import moment from 'moment';

export default class EventContent extends TrackerReact(React.Component) {
  openEvent(event){
    event.preventDefault();
  }

  renderContent() {
    dateString = "";
    start = this.props.event.start;
    if (start != null) {
      if (start.hasOwnProperty("_isAMomentObject") && !start._isAMomentObject) {
        start = new moment(start);
      }

      dateString = start.format('dddd Do MMM YYYY');

      end = this.props.event.end;
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
      <table>
        <tbody>
          <tr>
            <td>Name:</td>
            <td>{this.props.event.name}</td>
          </tr>
          <tr>
            <td>Description:</td>
            <td>{this.props.event.description}</td>
          </tr>
          <tr>
            <td>Date:</td>
            <td>{dateString}</td>
          </tr>
          <tr>
            <td>Time:</td>
            <td>{timeString}</td>
          </tr>
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <div>
        {this.renderContent()}
        <a href={"/forms/signin/" + this.props.event._id}><button>Form</button></a>
        <a href={"/forms/rsvp/"+ this.props.event._id}><button>RSVP</button></a>
      </div>
    )
  }
}
