import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import TextInput from '/client/sharedcomponents/TextInput';
import { Row, Column } from '/client/materialize.jsx';
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
			if(this.props.email.when < new Date()){
				const response = window.confirm("The scheduled time to send is before the current date. This will send the email immediately upon staging. If this is what you want, click okay, otherwise, please cancel and change the scheduled send time.");
				if(!response){
					return; // Do not stage
				}
			}
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
      <Row>
				<Column>
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

				</Column>
			</Row>
		)
	}
}
