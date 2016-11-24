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


		return (<li onClick={this.go.bind(this)} className="collection-item">
      <span className="title">{this.props.group.name}</span>
      <p>Members:<br/>
				{this.getMembers()}
			</p>
    </li>

		)
	}
}
