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
      start: props.ev.start,
      end: props.ev.end,
      startdate: new moment(props.ev.start).format("YYYY-MM-DD"),
      starttime: new moment(props.ev.start).format("HH:mm"),
      enddate: new moment(props.ev.end).format("YYYY-MM-DD"),
      endtime: new moment(props.ev.end).format("HH:mm")
    }
  }

  updateStartDate(event){
		//console.log(event);
		//Meteor.call("updateEventStart", this.props.ev._id, new Date(this.refs.startdate.value+"T"+this.refs.starttime.value));
    console.log(this);
    console.log(this.refs.end.props.value);
    Meteor.call("updateEventStart", this.props.ev._id, event);
    var difference = new moment(this.props.ev.end) - new moment(this.props.ev.start);
    Meteor.call("updateEventEnd", this.props.ev._id, new moment(event).add(moment.duration(difference))._d);

    /*
    if(new Date(this.refs.enddate.value+"T"+this.refs.endtime.value) < new Date(this.refs.startdate.value+"T"+this.refs.starttime.value)){
      this.refs.enddate.value=this.refs.startdate.value;
      if(new Date(this.refs.enddate.value+"T"+this.refs.endtime.value) < new Date(this.refs.startdate.value+"T"+this.refs.starttime.value)){
        this.refs.endtime.value=this.refs.starttime.value;
      }
      Meteor.call("updateEventEnd", this.props.ev._id, new Date(this.refs.enddate.value+"T"+this.refs.endtime.value));
    }
    */
    //if(this.checkDate()){ // catch the negative case else all is fine
    //  this.refs.endtime.value=this.refs.starttime.value;
    //  this.refs.enddate.value=this.refs.startdate.value;
    //}
	}

	updateEndDate(event){
    //if(this.checkDate()){
    //  window.alert("Cannot set end date/time before start.");
    //  this.refs.endtime.value=this.refs.starttime.value;
    //  this.refs.enddate.value=this.refs.startdate.value;
    //  return;
    //}
		//Meteor.call("updateEventEnd", this.props.ev._id, new Date(this.refs.enddate.value+"T"+this.refs.endtime.value));

    Meteor.call("updateEventEnd", this.props.ev._id, event);
    if(this.refs.start.props.value > event){
      var difference = new moment(this.props.ev.end) - new moment(this.props.ev.start);
      Meteor.call("updateEventStart", this.props.ev._id, new moment(event).subtract(moment.duration(difference))._d);
    }
    /*
    if(new Date(this.refs.enddate.value+"T"+this.refs.endtime.value) < new Date(this.refs.startdate.value+"T"+this.refs.starttime.value)){
      this.refs.startdate.value=this.refs.enddate.value;
      if(new Date(this.refs.enddate.value+"T"+this.refs.endtime.value) < new Date(this.refs.startdate.value+"T"+this.refs.starttime.value)){
        this.refs.starttime.value=this.refs.endtime.value;
      }
      Meteor.call("updateEventStart", this.props.ev._id, new Date(this.refs.startdate.value+"T"+this.refs.starttime.value));
    }
    */
	}
  /*
  handleStartDateChange(event){ // need one of these for each component
    this.setState({startdate:event.target.value});
  }

  handleStartTimeChange(event){ // need one of these for each component
    this.setState({starttime:event.target.value});
  }
  handleEndDateChange(event){ // need one of these for each component
    this.setState({enddate:event.target.value});
  }
  handleEndTimeChange(event){ // need one of these for each component
    this.setState({endtime:event.target.value});
  }

  getEvent(){
		//console.log(Events.find({_id: this.props.eid}).fetch());
		//return Events.find({_id: this.props.eid}).fetch();
		return Events.findOne(this.props.eid);
	}

  */
  render(){
    //let ev = this.getEvent();

  	//if(!ev){
  	//	return (<div>Loading...</div>);
  	//}
    //this.setState({start: this.props.ev.start});
    //this.setState({end: this.props.ev.end});
    var startdate = new moment(this.props.ev.start).format("YYYY-MM-DD");
  	var starttime = new moment(this.props.ev.start).format("HH:mm");
  	var enddate = new moment(this.props.ev.end).format("YYYY-MM-DD");
  	var endtime = new moment(this.props.ev.end).format("HH:mm");
    return (
      <div>
      <label>Start</label>
      <DateTimePicker ref="start"
        value={this.props.ev.start}
        disabled={!this.props.perm}
        onChange={this.updateStartDate.bind(this)} />
      {/*
      <input type="date" ref="startdate" name="startdate" value={startdate} onBlur={this.updateStartDate.bind(this)} onChange={this.handleStartDateChange} />
      <input type="time" ref="starttime" name="startdate" value={starttime} onBlur={this.updateStartDate.bind(this)} onChange={this.handleStartTimeChange}/>
      */}
      <label>End</label>
      <DateTimePicker ref="end"
        value={this.props.ev.end}
        disabled={!this.props.perm}
        onChange={this.updateEndDate.bind(this)} />
      {/*
      <input type="date" ref="enddate" name="enddate" value={enddate} onBlur={this.updateEndDate.bind(this)} onChange={this.handleEndDateChange}/>
      <input type="time" ref="endtime" name="endtime" value={endtime} onBlur={this.updateEndDate.bind(this)} onChange={this.handleEndTimeChange}/>
      */}
      </div>
    )
  }
}
