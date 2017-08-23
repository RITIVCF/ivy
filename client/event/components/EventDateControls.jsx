import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';

// export default class EventDateControls extends TrackerReact(React.Component) {
export default class EventDateControls extends React.Component {
  constructor(props){
    super(props);
    momentLocalizer(moment);
    this.state = {
      start: props.start,
      end: props.end,
      editstart: false,
      editend: false
    }
  }

  handleStartChange(value){
    this.setState({start: value});
  }

  handleEndChange(value){
    this.setState({end: value});
  }

  updateStartDate(event){
    event.preventDefault();
    Meteor.call("updateEventStart", this.props.eid, this.state.start);
    this.toggleStart();
	}

	updateEndDate(event){
    event.preventDefault();
    Meteor.call("updateEventEnd", this.props.eid, this.state.end);
    this.toggleEnd();
	}

  toggleStart(){
    this.setState({editstart: !this.state.editstart});
  }

  toggleEnd(){
    this.setState({editend: !this.state.editend});
  }

  render(){
    var startdate = new moment(this.props.start).format("ddd Do MMM YYYY");
  	var starttime = new moment(this.props.start).format("h:mm A");
  	var enddate = new moment(this.props.end).format("ddd Do MMM YYYY");
  	var endtime = new moment(this.props.end).format("h:mm A");
    let editstart = this.state.editstart;
    let editend = this.state.editend;
    return (
      <div>
				<label>Start</label>{(this.props.perm&&!editstart)&&<i className="tiny material-icons" onClick={this.toggleStart.bind(this)}>edit</i>}
				{!editstart?<p style={{marginTop:"0px"}}>{startdate} {starttime}</p>:
				<form onSubmit={this.updateStartDate.bind(this)}>
					<DateTimePicker ref="start"
						defaultValue={this.props.start}
						onChange={this.handleStartChange.bind(this)}
          />
					<input type="submit" value="Save" className="btn" />
					<button type="button" onClick={this.toggleStart.bind(this)} className="btn">Close</button>
				</form>}
				<label>End</label>{(this.props.perm&&!editend)&&<i className="tiny material-icons" onClick={this.toggleEnd.bind(this)}>edit</i>}
				{!editend?<p style={{marginTop:"0px"}}>{enddate} {endtime}</p>:
        <form onSubmit={this.updateEndDate.bind(this)}>
          <DateTimePicker ref="end"
            defaultValue={this.props.end}
            onChange={this.handleEndChange.bind(this)}
            />
          <input type="submit" value="Save" className="btn" />
          <button type="button" onClick={this.toggleEnd.bind(this)} className="btn">Close</button>
        </form>}
      </div>
    )
  }
}
