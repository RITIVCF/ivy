import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Rating from './Rating.jsx';
import QuestionInput from './QuestionInput.jsx';

import Debrief from '/lib/classes/Debrief.js';

export default class DebriefForm extends TrackerReact(React.Component) {
	constructor(props) {
    super(props);

		this.state = {
			debrief: false,
			submitted: false
		};

		this.load();



		this.updateDraftQuestionValue = this.updateDraftQuestionValue.bind(this);
		this.updateDraftQuestionComment = this.updateDraftQuestionComment.bind(this);
  }

  componentWillUnmount(){
  }

	load(){
		let debrief = new Debrief(this.props.eid);
		if(!debrief._id){
			Meteor.call("insertDebriefDraft", this.props.eid, (error, result) => {
				if(error){
					console.log(error);
				}else{
					this.setState({debrief: new Debrief(this.props.eid)});
				}
			});
		}
		else{
			this.state.debrief = debrief;
		}

	}

	updateDraftQuestionValue(i, value){
		this.state.debrief.updateQuestionValue(i, value);
	}

	updateDraftQuestionComment(i, comment){
		this.state.debrief.updateQuestionComment(i, comment);
	}

	// Figure out how to instantiate a new debrief with an id
	save(){
		this.state.debrief.saveDraft();
	}

	submit(event){
		event.preventDefault();
		this.state.debrief.submit();
		routeTo("viewdebrief", {eid: this.props.eid});
	}

	componentDidMount(){

	}

	render() {
		let ev = this.props.event;
		let debrief = this.state.debrief;
		if(!debrief){
			return (
				false
			);
		}
		return (
			<div className="card">
				<div className="card-content">
					<span className="card-title">{ev.name}
						<span style={{fontSize: "14px", marginLeft: "10px"}}>
							{moment(ev.start.toISOString()).format("DD MMM YYYY")}
						</span>
					</span>
					<div className="row">
		        <form onSubmit={this.submit.bind(this)}>
							{debrief.questions.map((question, i)=>{
								return <QuestionInput
									key={question._id}
									question={question}
									updateDraftValue={(value)=>{this.updateDraftQuestionValue(i, value)}}
									updateDraftComment={(comment)=>{this.updateDraftQuestionComment(i, comment)}}
											 />
							})}
							<div className="col s12">
								<button className="btn" >Submit</button>
								<span className="right">Draft saved</span>
							</div>
						</form>
		      </div>
				</div>
			</div>

		)
	}
}
