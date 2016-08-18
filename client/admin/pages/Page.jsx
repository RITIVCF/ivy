import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SelectGroup from '../../sharedcomponents/SelectGroup.jsx';
import Group from './Group.jsx';

export default class Page extends TrackerReact(React.Component) {
	constructor(){
		super();

	}

	unset(){

	}

	addGroup(group){
		Meteor.call("addGroupToPage", this.props.page._id, group._id);
	}

	getGroups(){
		return Groups.find({_id:{$in:this.props.page.groups}}).fetch();
	}

	render() {
		return (
		<div>
			<h1>{this.props.page.pagename}</h1>
			<p>Add Groups to this page:</p>
			<SelectGroup
				parent={this}
				id={this.props.page.pagename}
				unset={this.unset.bind(this)}
				updateContact={this.addGroup.bind(this)}
				initialValue={""}
				ref={"group"}
				/>
			<table>
				<thead>
					<tr>
						<th>Remove</th>
						<th>Group Name</th>
					</tr>
				</thead>
				<tbody>
					{this.getGroups().map( (group)=>{
						return <Group group={group} page={this.props.page} />
					})}
				</tbody>
			</table>
		</div>
		)
	}
}
