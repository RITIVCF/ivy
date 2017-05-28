import React, {Component} from 'react';

export default class Tag extends Component {

	removeTag(event){
		event.stopPropagation();
		Meteor.call("removeDebriefQuestionTag", this.props.qid, this.props.tag);
	}

  render(){
		let tag = this.props.tag;
    return (
			<div className="chip">
		    {tag}
		    <i className="close material-icons" onClick={this.removeTag.bind(this)}>close</i>
		  </div>
    )
  }
}
