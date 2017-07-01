import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class QuestionInput extends TrackerReact(React.Component) {
	constructor(props) {
		super(props);

		this.state = {
			values: [1, 2, 3, 4, 5],
			value: props.question.value,
			comment: props.question.comment
		};

		this.getValue = this.getValue.bind(this);
		this.handleRatingChange = this.handleRatingChange.bind(this);
		this.handleCommentChange = this.handleCommentChange.bind(this);
	}

	getValue(){
		return this.state;
	}

	handleCommentChange(event){
		this.setState({comment: event.target.value});
		this.props.updateDraftComment( event.target.value );
	}

	handleRatingChange(event){
		this.setState({value: event.target.value});
		this.props.updateDraftValue( event.target.value);
	}

	render() {
		let question = this.props.question;
		return (
			<li>
				<p>{question.text}</p>
				{this.state.values.map((value) => {
					let inputId = question._id+"_"+value;
					return	(<p key={value}>
			      <input type="radio" value={value}
							id={inputId}
							checked={this.state.value==value}
							onChange={this.handleRatingChange}/>
						<label htmlFor={inputId}>{value}</label>
			    </p>
				)
				})}
				<textarea onChange={this.handleCommentChange} value={question.comment} />
			</li>
		)
	}
}
