import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import LoaderCircle from '../../LoaderCircle.jsx';

import Checkbox from '../../contact/Checkbox.jsx';
import Tag from './Tag.jsx';
import SelectTag from '../../sharedcomponents/SelectTag.jsx';

export default class DebriefInfoBar extends TrackerReact(React.Component) {
  constructor(props) {
    super(props);

    this.state = {
      value: ""
    }

  }

	getQuestion(){
		return DebriefQuestions.findOne(this.props.qid);
	}

	addTag(tag){
		Meteor.call("addDebriefQuestionTag", this.props.qid, tag.tag);
	}

	changeCommentOpenClosed(){
		let question = this.getQuestion();
		Meteor.call("setDebriefQuestionCommentOpenClosed", this.props.qid, question.commentOpen);
	}

	deleteQuestion(){
		Meteor.call("deleteDebriefQuestion", this.props.qid);
		Session.set("selectedQuestion","");
	}

  render(){
		let qid = this.props.qid;
		let question = this.getQuestion();
		if(!qid){
			return(
				<div className="row">
					<div className="col s12">
						<p><strong>Please select a question to change details.</strong></p>
					</div>
				</div>
			)
		}
		if(!question){
			return (<LoaderCircle />);
		}
		let tags = question.types;

    return (
      <div className="row">
        <div className="col s12">
					<p><strong>Add to/Remove from event type:</strong></p>

					<div style={{backgroundColor: "white", outline:"grey solid 1px", padding: "5px"}}>
						<SelectTag
	            parent={this}
	            ref="tagInput"
	            onSelected={this.addTag.bind(this)}
	            initialValue={this.state.value}
	            />

						{tags.map( (tag) => {
							return <Tag key={tag.tag} tag={tag} />
						})}
					</div>

					<Checkbox	label={"Comment open"}
							onChange={this.changeCommentOpenClosed.bind(this)}
							checked={question.commentOpen} />
						<br />
					{!question.submitted&&
						<button className="btn red" onClick={this.deleteQuestion.bind(this)}>Remove</button>
					}

        </div>
      </div>
    )
  }
}
