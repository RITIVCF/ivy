import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import GroupItem from './GroupItem.jsx';

export default class MyGroups extends TrackerReact(React.Component) {
	constructor(){
		super();

		// this.state = {
		// 	subscription: {
		// 		groups: Meteor.subscribe("MyGroups")
		// 	}
		// }
	}

	getGroups(){
		return Groups.find({users: Meteor.userId()}).fetch();
	}


	render() {
		return (
			<div className="card">
				<div className="card-content">
					<span className="card-title">My Groups</span>
					<ul className="collection">
						{this.getGroups().map((group)=>{
							return <GroupItem key={group._id} group={group} />
						})}
					</ul>
				</div>
			</div>
		)
	}
}
