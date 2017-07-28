import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class EmailSummary extends TrackerReact(React.Component){
	constructor() {
		super();

		this.state = {
			subscription: {

			}
		};


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
		console.log(groups);
		var users = Meteor.users.find({_id: {$in: this.props.email.to.users}}).fetch();
		console.log("User in Email: ", this.props.email.to.users);
		console.log(users);
		var emails = this.props.email.to.emails;
		console.log(emails);
		if(groups.length> 0){
			to += groups[0].name;
			console.log("Adding first group",groups[0].name);
			if(groups.length>1){
				to += "(+"+ (groups.length-1).toString() +"), ";
				console.log("Adding extra groups...", groups.length-1);
			}
			else{
				to += ", ";
			}
		}
		if(users.length> 0){
			to += users[0].name;
			console.log("Adding first user",users[0].name);
			if(users.length>1){
				to += "(+"+ (users.length-1).toString() +"), ";
				console.log("Adding extra users...", users.length-1);
			}
			else{
				to += ", ";
			}
		}
		if(emails.length> 0){
			to += emails[0];
			console.log("Adding first email",emails[0].name);
			if(emails.length>1){
				to += "(+"+ (emails.length-1).toString() +"), ";
				console.log("Adding extra emails...", emails.length-1);
			}
			else{
				to += ", ";
			}
		}
		console.log("Before", to);
		to = to.replace(/,\s*$/, "");
		console.log("After", to);

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
				<span style={{width: "20%", display: "inline-block"}}>{email.subject}</span>
				<span style={{width: "30%", display: "inline-block"}}>{this.getTo()}</span>
				<span style={{width: "15%", display: "inline-block"}}>{email.from}</span>
				<span style={{width: "15%", display: "inline-block"}}>{this.getTemplate()}</span>
				<span style={{width: "20%", display: "inline-block"}}>{dateFormat(email.when)}</span>
			</li>
		)
	}
}
