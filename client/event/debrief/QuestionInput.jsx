import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class QuestionInput extends TrackerReact(React.Component) {
	constructor(props) {
		super(props);

		this.state = {
			values: [1, 2, 3, 4, 5],
			value: props.question.value,
			comment: props.question.comment,
			commentOpen: props.question.commentOpen
		};

		this.getValue = this.getValue.bind(this);
		this.handleRatingChange = this.handleRatingChange.bind(this);
		this.handleCommentChange = this.handleCommentChange.bind(this);
	}

	getValue(){
		return this.state;
	}

	toggleComment() {
		this.setState({commentOpen: !this.state.commentOpen});
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
		const commentOpen = this.state.commentOpen;
		return (
			<div style={{marginBottom: "20px"}}>
				<p>{question.text}</p>
				{this.state.values.map((value) => {
					let inputId = question._id+"_"+value;
					return	(<p style={{display: "inline-block", margin: "0 10px"}} key={value}>
			      <input type="radio" value={value}
							id={inputId}
							checked={this.state.value==value}
							onChange={this.handleRatingChange}/>
						<label htmlFor={inputId} style={{paddingLeft: "25px"}}>{value}</label>
			    </p>
					)
				})}
				<br />
				<span style={{userSelect: "none", fontSize: "12px", color: "#777", cursor: "pointer"}} onClick={this.toggleComment.bind(this)}>{commentOpen?"Collapse comment":"Expand comment"}</span>
				<div className={commentOpen?"commentDefault commentOpen":"commentDefault"}>
					<textarea style={{width: "100%"}} className="materialize-textarea" onChange={this.handleCommentChange} value={question.comment} />
				</div>
			</div>
		)
	}
	// refresh again
}
