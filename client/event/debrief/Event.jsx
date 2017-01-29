import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class DebriefSummary extends React.Component {
	constructor() {
    super();


  }

	open(){
		FlowRouter.go("/events/debrief/edit/"+this.props.ev._id);
	}

	tags(){
		let tags = "";
		this.props.ev.tags.forEach((tag)=>{
			tags += tag +", ";
		});
		tags = tags.replace(/,\s*$/, "");
		return tags;
	}

	leader(){
		console.log(this.props.ev.owner);
		let owner = Meteor.users.findOne(this.props.ev.owner);
		return <a href={"/people/"+owner._id} >{owner.name}</a>;
	}


	render() {
		let ev = this.props.ev;
		return (
			<tr onDoubleClick={this.open.bind(this)}>
				<td>{ev.name}</td>
				<td>{moment(ev.start.toISOString()).format("DD MMM YYYY")}</td>
				<td>{this.tags()}</td>
				<td>{this.leader()}</td>
			</tr>
		)
	}
}
