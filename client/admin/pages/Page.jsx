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
			<div className="row">
				<div className="col-md-8">
					<div className="panel panel-default">
						<div className="panel-heading">
							<h1>{this.props.page.pagename}</h1>
						</div>
						<div className="panel-body">
							<p>Add Groups to this page:</p>
							<SelectGroup
								parent={this}
								id={this.props.page.pagename}
								unset={this.unset.bind(this)}
								updateContact={this.addGroup.bind(this)}
								initialValue={""}
								ref={"group"}
								/>
						</div>
						<table className="table table-striped">
							<thead>
								<tr>
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
				</div>
			</div>
		)
	}
}
