import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';


export default class EventDateControls extends TrackerReact(React.Component) {
  constructor(props){
    super(props);
    momentLocalizer(moment);
    this.state = {
      start: props.start,
      end: props.end,
      startdate: new moment(props.start).format("YYYY-MM-DD"),
      starttime: new moment(props.start).format("HH:mm"),
      enddate: new moment(props.end).format("YYYY-MM-DD"),
      endtime: new moment(props.end).format("HH:mm")
    }
  }

  updateStartDate(event){
    Meteor.call("updateEventStart", this.props.eid, event);
    console.log("Starttime: ", event);
    var difference = new moment(this.props.end) - new moment(this.props.start);
    Meteor.call("updateEventEnd", this.props.eid, new moment(event).add(moment.duration(difference))._d);
	}

	updateEndDate(event){
    Meteor.call("updateEventEnd", this.props.eid, event);
    if(this.refs.start.props.value > event){
      var difference = new moment(this.props.end) - new moment(this.props.start);
      Meteor.call("updateEventStart", this.props.eid, new moment(event).subtract(moment.duration(difference))._d);
    }
	}

  render(){
    var startdate = new moment(this.props.start).format("YYYY-MM-DD");
  	var starttime = new moment(this.props.start).format("HH:mm");
  	var enddate = new moment(this.props.end).format("YYYY-MM-DD");
  	var endtime = new moment(this.props.end).format("HH:mm");
    return (
      <div>
      <label>Start</label>
      <DateTimePicker ref="start"
        value={this.props.start}
        disabled={!this.props.perm}
        onChange={this.updateStartDate.bind(this)} />
      <label>End</label>
      <DateTimePicker ref="end"
        value={this.props.end}
        disabled={!this.props.perm}
        onChange={this.updateEndDate.bind(this)} />
      </div>
    )
  }
}
