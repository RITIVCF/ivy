import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import TextInput from '/client/sharedcomponents/TextInput';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';

export default class EditEmailDetailsForm extends TrackerReact(React.Component){
  constructor() {
    super();
		momentLocalizer(moment);

		this.handleSubjectChange =  _.debounce((newValue)=>{this.updateSubject(newValue)}, 500);
		this.handleStageClick = this.handleStageClick.bind(this);
		this.handleWhenChange = this.handleWhenChange.bind(this);
  }

  componentWillUnmount() {

  }

	updateSubject(newValue){
		Meteor.call("updateEmailSubject", this.props.email._id, newValue);
	}

	handleStageClick(isStaged){
		if(isStaged){
			Meteor.call("unstageEmail", this.props.email._id);
		} else{
			Meteor.call("stageEmail", this.props.email._id);
		}
	}

	handleWhenChange(newValue){
		Meteor.call("updateEmailWhen", this.props.email._id, newValue);
	}

  render() {
		let email = this.props.email;
		let isStaged = email.status == "staged";
		let isSent = email.status == "sent";
    return (
      <div className="row">
				{!isSent&&
					<button
						className="btn waves-light waves-effect"
						onClick={()=>{this.handleStageClick(isStaged)}}
					>
						{isStaged?"Unstage":"stage"}
					</button>
				}
				<TextInput
					id="emailsubject"
					defaultValue={email.subject}
					label="Email Subject"
					onChange={(newValue)=>{this.handleSubjectChange(newValue)}}
				/>
				<label>Scheduled Time to Send</label>
				<DateTimePicker
					ref="when"
					defaultValue={email.when}
					onChange={this.handleWhenChange}
				/>

			</div>
		)
  }
}
