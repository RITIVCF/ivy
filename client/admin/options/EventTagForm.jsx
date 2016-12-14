import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Tag from './Tag.jsx';

export default class EventTagForm extends TrackerReact(React.Component) {
	constructor(){
		super();

	}

	getEventTags(){
		return Options.findOne("eventtags").vals;
	}

	newTag(event){
		event.preventDefault();
		Meteor.call("newEventTag", this.refs.tag.value);
		this.refs.tag.value="";
	}


	render() {
		return (
			<div className="card">
				<div className="card-content">
					<span className="card-title">Event Tags</span>
					<p>Choose a color to represent each event tag.</p>
				{/*}	<form onSubmit={this.newTag.bind(this)}>
						<label htmlFor="tag">New Event Tag</label>
						<input type="text" ref="tag" name="tag" />

					</form>*/}
					<ul className="collection">
						{this.getEventTags().map((tag)=>{
							return <Tag key={tag} tag={tag} />
						})}
					</ul>
				</div>
			</div>
		)
	}
}
