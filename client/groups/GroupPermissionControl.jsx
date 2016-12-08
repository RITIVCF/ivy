import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class GroupPermissionControl extends TrackerReact(React.Component) {
	constructor(props) {
    super(props);

  }

	getPermissions(group){
		if(group){
			return PagePermissions.find({groups: this.props.group._id}).fetch();
		}
		else{
			return PagePermissions.find({groups: {$ne: this.props.group._id}}).fetch();
		}
	}

	add(){
		Meteor.call("addGroupToPage", this.refs.pages.value, this.props.group._id);
	}

	remove(){
		Meteor.call("removeGroupFromPage", this.refs.grouppages.value, this.props.group._id);
	}

	render() {

		return (
					<div className="row">
						<div className="col md5">
							<p>Available Permissions</p>
							<select
								multiple
								className="browser-default"
								size="10"
								ref="pages" >
								{this.getPermissions(false).map((perm)=>{
									return <option key={perm._id} value={perm._id}>{perm.pagename}</option>
								})}
							</select>
						</div>
						<div className="col md2">
							<div className="row">
								<button onClick={this.add.bind(this)} className="btn">{"=>"}</button>
							</div>
							<div className="row">
								<button onClick={this.remove.bind(this)} className="btn">{"<="}</button>
							</div>
						</div>
						<div className="col md5">
							<p>{this.props.group.name+"'s"} Permissions</p>
							<select
								className="browser-default"
								multiple
								size="10"
								ref="grouppages" >
								{this.getPermissions(true).map((perm)=>{
									return <option key={perm._id} value={perm._id}>{perm.pagename}</option>
								})}
							</select>
						</div>
					</div>
		)
	}
}
