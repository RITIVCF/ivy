import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class FeedbackForm extends TrackerReact(React.Component) {
	constructor(){
		super();

	}

	componentDidMount(){
			$('select').material_select();
	}

	submit(event){
		event.preventDefault();
		let subject = this.refs.subject.value.trim();
		let feedback = this.refs.feedback.value.trim();
		let type = this.refs.type.value;
		if(subject==""){
			Materialize.toast("Please enter a subject.", 4000);
			return;
		}
		if(feedback==""){
			Materialize.toast("Please enter feedback.", 4000);
			return;
		}
		if(type==""){
			Materialize.toast("Please select a type from the list.", 4000);
			return;
		}
		var thiz = this;
		Meteor.call("submitFeedback", subject, feedback, type,function(error){
			if(error){
				Materialize.toast('Oops! Looks like something went wrong. Try again later. If the problem persists, '
					+ 'contact support.', 4000);
			}
			else {
					Materialize.toast('Success! Your feedback was successfully submitted. Thanks for letting us know!', 4000);
					thiz.refs.subject.value="";
					thiz.refs.feedback.value="";
					thiz.refs.type.value="";
			}
		});


	}

	render() {
		return (
			<div className="card">
				<div className="card-content">
					<span className="card-title">Ivy Feedback</span>
					<form onSubmit={this.submit.bind(this)}>
						<p>If you have any thoughts, comments, or issues, please submit them
						below.<br/>Thank you! - RIT IVCF Web Development Team</p>
					<div className="input-field col s12">
							<input type="text" ref="subject" id="feedbacksubj" />
							<label htmlFor="feedbacksubj">Subject</label>
						</div>
						<div className="input-field col s12">
							<textarea
								ref="feedback"
								id="textarea1"
								className="materialize-textarea"></textarea>
				 			<label htmlFor="textarea1">Feedback</label>
	        	</div>
						<div className="input-field col s12">
					    <select ref="type" value="">
					      <option value="">Choose your option</option>
								<option value="Issue">Issue</option>
								<option value="Comment">Comment</option>
								<option value="Suggestion">Suggestion</option>
								<option value="Other">Other</option>
					    </select>
					    <label>Select Type</label>
					  </div>
						<button className="btn waves-effect waves-light" type="submit" name="action">Submit
					  </button>
					</form>
				</div>
			</div>

		)
	}
}
