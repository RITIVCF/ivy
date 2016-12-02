import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class GroupItem extends TrackerReact(React.Component) {
	constructor(){
		super();

	}


	go(){
		if(checkPermission('admin')){
			FlowRouter.go("/admin/groups");
		}
	}

	leave(event){
		event.stopPropagation();
		if(window.confirm("Are you sure?")){
			Meteor.call("removeUserFromGroup", this.props.group._id, Meteor.userId());
		}
	}

	getMembers(){
		var ids = this.props.group.users;
		var memberstring = "";
		ids.forEach((id)=>{
			memberstring += Contacts.findOne(Meteor.users.findOne(id).contact).name+", ";
		})
		memberstring = memberstring.slice(0, -2);
		return memberstring;
	}


	render() {


		return (<li onClick={this.go.bind(this)} className="collection-item" id="showhim">
      <span className="title">{this.props.group.name}</span>
			<a id="showme" className="btn right valign"
				onClick={this.leave.bind(this)}>Leave</a>
      <p>Members: <br/>
				{this.getMembers()}

			</p>
    </li>

		)
	}
}
