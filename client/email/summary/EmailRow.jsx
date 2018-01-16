import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class EmailSummary extends TrackerReact(React.Component){
	constructor() {
		super();

	}

	componentWillUnmount() {

	}

	select(){
		Session.set("selectedEmail", this.props.email._id);
	}

	open(){
		FlowRouter.go("/emails/workspace/"+this.props.email._id);
	}

	getTemplate(){
		return Emails.findOne(this.props.email.template).title;
	}

	getTo(){
		var to = "";
		var groups = Groups.find({_id: {$in: this.props.email.to.groups}}).fetch();
		var users = Meteor.users.find({_id: {$in: this.props.email.to.users}}).fetch();
		var emails = this.props.email.to.emails;
		if(groups.length> 0){
			to += groups[0].name;
			if(groups.length>1){
				to += "(+"+ (groups.length-1).toString() +"), ";
			}
			else{
				to += ", ";
			}
		}
		if(users.length> 0){
			to += users[0].name;
			if(users.length>1){
				to += "(+"+ (users.length-1).toString() +"), ";
			}
			else{
				to += ", ";
			}
		}
		if(emails.length> 0){
			to += emails[0];
			if(emails.length>1){
				to += "(+"+ (emails.length-1).toString() +"), ";
			}
			else{
				to += ", ";
			}
		}
		to = to.replace(/,\s*$/, "");

		return to;
	}

	isSelected(){
		if(this.props.isSelected){
			return " blue white-text";
		}
		return "";
	}

	handleClick(){
		this.select();
	}

	handleDoubleClick(){
		if(!this.props.email.sent){
			this.open();
		}
	}

	render() {
		let email = this.props.email;
		return (
			<li className={"collection-item trunc-cell"+this.isSelected()}
				onClick={this.handleClick.bind(this)}
				onDoubleClick={this.handleDoubleClick.bind(this)} >
				<span style={{width: "20%", display: "inline-block"}} title={email.subject}>{email.subject}</span>
				<span style={{width: "30%", display: "inline-block"}}>{this.getTo()}</span>
				<span style={{width: "15%", display: "inline-block"}} title={email.from}>{email.from}</span>
				<span style={{width: "15%", display: "inline-block"}}>{this.getTemplate()}</span>
				<span style={{width: "20%", display: "inline-block"}}>{dateFormat(email.when)}</span>
			</li>
		)
	}
}
