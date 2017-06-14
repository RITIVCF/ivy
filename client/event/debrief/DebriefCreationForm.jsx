import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import QuestionLine from './QuestionLine.jsx';

export default class DebriefCreationForm extends TrackerReact(React.Component) {
	constructor(props) {
		super(props);

		this.state = {

		};
	}

	getQuestions(){
		return DebriefQuestions.find().fetch().reverse();
	}

	addQuestion(event){
		event.preventDefault();
		let question = this.refs.question.value.trim();
		Meteor.call("addDebriefQuestion", question, "Rating");
		this.refs.question.value = "";
	}

	render() {
		let questions = this.getQuestions();
		return (
			<div className="row">
				<div className="col s12">

					<div className="card">
						<div className="card-content">
							<div className="row" style={{marginBottom: "0"}}>
								<form onSubmit={this.addQuestion.bind(this)}>
									<div className="col s10 m8">
										<div className="input-field col s12">
											<input id="questionInput" type="text" ref="question" />
											<label htmlFor="questionInput">New Question</label>
										</div>
									</div>
									<div className="col s2 m4">
										<span className="right">
											<button type="submit" className="btn-floating btn-large green waves-effect waves-light">
												<i className="material-icons">add</i>
											</button>
										</span>
									</div>
								</form>
							</div>
						</div>
					</div>

					<ul className="collection">
						{questions.length>0?questions.map( (question) => {
							return <QuestionLine key={question._id} question={question} selected={Session.get("selectedQuestion")==question._id} />
						}):<li className="collection-item">No Questions</li>}
					</ul>
				</div>
			</div>
		)
	}
}
