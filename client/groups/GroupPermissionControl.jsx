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
			<div className="panel panel-default">
				<div className="panel-heading">

				</div>
				<div className="panel-body">
					<div className="row">
						<div className="col-md-5">
							<p>Available Permissions</p>
							<select
								className="form-control"
								multiple
								size="10"
								ref="pages" >
								{this.getPermissions(false).map((perm)=>{
									return <option key={perm._id} value={perm._id}>{perm.pagename}</option>
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
							<p>{this.props.group.name+"'s"} Permissions</p>
							<select
								multiple
								className="form-control"
								size="10"
								ref="grouppages" >
								{this.getPermissions(true).map((perm)=>{
									return <option key={perm._id} value={perm._id}>{perm.pagename}</option>
								})}
							</select>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
