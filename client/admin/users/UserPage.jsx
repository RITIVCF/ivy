import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class UserPage extends TrackerReact(React.Component) {
	constructor(){
		super();

	}

	getUser(){
		return Contacts.findOne(Meteor.users.findOne(this.props.uid).contact);
	}

	getAllGroups(){
		return Groups.find({users: {$ne: this.props.uid}}).fetch();
	}

	getUserGroups(){
		return Groups.find({users: this.props.uid}).fetch();
	}

	add(){
		Meteor.call("addUserToGroup", this.refs.groups.value, this.props.uid);
	}

	remove(){
		Meteor.call("removeUserFromGroup", this.refs.usergroups.value, this.props.uid);
	}

	render() {
		let user = this.getUser();
		if(!user){
			return <div></div>
		}
		return (
			<div>
				<h1>{user.name}</h1>
				<div className="panel panel-default">
					<div className="panel-heading">

					</div>
					<div className="panel-body">
						<div className="row">
							<div className="col-md-5">
								<p>Available Groups</p>
								<select
									className="form-control"
									multiple
									ref="groups" >
									{this.getAllGroups().map((group)=>{
										return <option key={group._id} value={group._id}>{group.name}</option>
									})}
								</select>
							</div>
							<div className="col-md-2">
								<div className="row">
									<button onClick={this.add.bind(this)} className="btn">{"=>"}</button>
								</div>
								<div className="row">
									<button onClick={this.remove.bind(this)} className="btn">{"<="}</button>
								</div>
							</div>
							<div className="col-md-5">
								<p>{user.name+"'s"} Groups</p>
								<select
									multiple
									className="form-control"
									ref="usergroups" >
									{this.getUserGroups().map((group)=>{
										return <option key={group._id} value={group._id}>{group.name}</option>
									})}
								</select>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
