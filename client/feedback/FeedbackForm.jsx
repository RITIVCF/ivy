import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class FeedbackForm extends TrackerReact(React.Component) {
	constructor(){
		super();
		this.state={
			error: false,
			success: false
		}
	}

	submit(event){
		event.preventDefault();
		console.log(this);
		console.log(event);
		this.setState({error: false});
		this.setState({success: false});
		var thiz = this;
		Meteor.call("submitFeedback", this.refs.feedback.value, this.refs.type.value,function(error){
			if(error){
				thiz.setState({error: true});
			}
			else {
				thiz.setState({success: true});
				thiz.refs.feedback.value="";
				thiz.refs.type.value="Issue";
			}
		});


	}

	render() {
		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					Ivy Feedback
				</div>
				<div className="panel-body">
					{this.state.error?<div className="alert alert-danger alert-dismissible" role="alert">
						  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
								<span aria-hidden="true">&times;</span></button>
						  <strong>Oops!</strong> Looks like something went wrong. Try again later. If the problem persists,
								contact support.
						</div>:""}
						{this.state.success?<div className="alert alert-success alert-dismissible" role="alert">
							  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
									<span aria-hidden="true">&times;</span></button>
							  <strong>Success!</strong> Your feedback was successfully submitted. Thanks for letting us know!
							</div>:""}
					<form onSubmit={this.submit.bind(this)}>
						<p>If you have any thoughts, comments, or issues, please submit them
						below.<br/>Thank you! - RIT IVCF Web Development Team</p>
						<div className="form-group">

							<textarea ref="feedback" className="form-control" rows="5" placeholder="Yo man, I got this big problem with..."/>
						</div>
						<div className="form-group">
							<label>Type</label>
							<select ref="type" className="form-control" >
								<option value="Issue">Issue</option>
								<option value="Comment">Comment</option>
								<option value="Suggestion">Suggestion</option>
								<option value="Other">Other</option>
							</select>
						</div>
						<div className="form-group">
							<input className="form-control"
								type="submit" value="Submit" />
						</div>
					</form>
				</div>
			</div>

		)
	}
}
