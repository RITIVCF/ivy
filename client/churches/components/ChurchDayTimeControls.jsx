import React, {Component} from 'react';

export default class ChurchDayTimeControl extends Component {
  updateStartDate(event){
		event.preventDefault();
		Meteor.call("updateEventStart", this.props.eid, new Date(this.refs.startdate.value+"T"+this.refs.starttime.value));
    if(this.checkDate()){ // catch the negative case else all is fine
      this.refs.endtime.value=this.refs.starttime.value;
      this.refs.enddate.value=this.refs.startdate.value;
    }
	}

  checkDate(){  // if all is well, return false, if start is greater than end, return true
    if(new Date(this.refs.enddate.value+"T"+this.refs.endtime.value) < new Date(this.refs.startdate.value+"T"+this.refs.starttime.value)){
      return true;
    }
    return false;
  }

	updateEndDate(event){
		event.preventDefault();
    if(this.checkDate()){
      window.alert("Cannot set end date/time before start.");
      this.refs.endtime.value=this.refs.starttime.value;
      this.refs.enddate.value=this.refs.startdate.value;
      return;
    }
		Meteor.call("updateEventEnd", this.props.eid, new Date(this.refs.enddate.value+"T"+this.refs.endtime.value));
	}

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

  render(){
    let ev = this.getEvent();

  	if(!ev){
  		return (<div>Loading...</div>);
  	}
    var startdate = new moment(ev.start).format("YYYY-MM-DD");
  	var starttime = new moment(ev.start).format("HH:mm");
  	var enddate = new moment(ev.end).format("YYYY-MM-DD");
  	var endtime = new moment(ev.end).format("HH:mm");
    return (
      <div>
      <label>Start</label>
      <input type="date" ref="startdate" value={startdate} onBlur={this.updateStartDate.bind(this)} onChange={this.handleStartDateChange} />
      <input type="time" ref="starttime" value={starttime} onBlur={this.updateStartDate.bind(this)} onChange={this.handleStartTimeChange}/>
      <label>End</label>
      <input type="date" ref="enddate" value={enddate} onBlur={this.updateEndDate.bind(this)} onChange={this.handleEndDateChange}/>
      <input type="time" ref="endtime" value={endtime} onBlur={this.updateEndDate.bind(this)} onChange={this.handleEndTimeChange}/>
      </div>
    )
  }
}
