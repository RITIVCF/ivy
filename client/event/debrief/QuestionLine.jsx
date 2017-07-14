import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Tag from './Tag.jsx';

export default class QuestionLine extends TrackerReact(React.Component) {
	constructor(props) {
		super(props);

		this.state = {

		};
	}

	select(){
		Session.set("selectedQuestion", this.props.question._id);
	}

	render() {
		let question = this.props.question;
		let tags = question.types;

		let icon = "change_history";
		if(this.props.question.type=="Person"){
			icon = "face";
		}

		let selected = "";
		if(this.props.selected){
			selected = " blue white-text";
		}

		let inactive = "";
		if(!question.active){
			inactive = " inactiveQuestion";
		}
		return (
			<li className={"collection-item"+selected+inactive} onClick={this.select.bind(this)}>
				<i className="material-icons">{icon}</i>

				{question.text}

				<span className="right">
					{tags.map( (tag) => {
						return <Tag key={tag.tag} qid={question._id} tag={tag} />
					})}
				</span>

			</li>
		)
	}
}
