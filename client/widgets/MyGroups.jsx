import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import GroupItem from './GroupItem.jsx';

export default class MyGroups extends TrackerReact(React.Component) {
	constructor(){
		super();

		this.state = {
			subscription: {
				names: Meteor.subscribe("contactNames")
			}
		}
	}

	componentWillUnmount(){
		this.state.subscription.names.stop();
	}

	getGroups(){
		return Groups.find({users: Meteor.userId(),types: {$ne:"Role"}}).fetch();
	}


	render() {
		return (
			<div className="card">
				<div className="card-content">
					<span className="card-title">My Groups</span>
					<ul className="collection">
						{this.state.subscription.names.ready()?this.getGroups().map((group)=>{
							return <GroupItem key={group._id} group={group} />
						}):<li></li>}
					</ul>
				</div>
			</div>
		)
	}
}
