import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import TextInput from '/client/sharedcomponents/TextInput';
import TinyMCE from '/client/sharedcomponents/TinyMCE';

export default class ToDoEmailForm extends TrackerReact(React.Component) {
  constructor() {
    super();

		this.state = {
			subject: "",
			message: ""
		};

		this.submit = this.submit.bind(this);
		this.handleSubjectChange = this.handleSubjectChange.bind(this);

  }

	submit(event){
		event.preventDefault();
		Meteor.call("sendToDoEmail", this.props.customerId, this.state.subject.trim(), this.state.message, this.props.ticketId);
		this.setState({subject: "", message: ""});
		if(this.props.onSubmit){
			this.props.onSubmit();
		}
	}

	handleSubjectChange(newValue){
		this.setState({subject: newValue});
	}

	handleMessageChange(newValue){
		this.setState({message: newValue.trim()});
	}

	render() {
		return (
			<div className="row">
				<form ref="form" className="col s12">
					<div className="row">
						<TextInput
							id={"todoemailsubject"}
							defaultValue={""}
							label="Subject"
							value={this.state.subject}
							onChange={(newValue)=>{this.handleSubjectChange(newValue)}}
						/>
						<TinyMCE
							id={"todoemailmessage"}
							content={this.state.message}
							onChange={(newValue)=>{this.handleMessageChange(newValue)}}
							ref="message"
						/>
					</div>
					<button
						onClick={this.submit.bind(this)}
						className="btn waves-effect waves-light"
					>
						Send
					</button>
				</form>
			</div>
		)
	}
}
