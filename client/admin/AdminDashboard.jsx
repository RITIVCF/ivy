import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class AdminDashboard extends TrackerReact(React.Component) {
	constructor(){
		super();

	}

	goToGroups(){
		FlowRouter.go("/admin/groups");
	}

	goToPermissions(){
		FlowRouter.go("/admin/pages");
	}

	goToSettings(){
		FlowRouter.go("/admin/settings");
	}

	render() {
		document.title="Ivy - Admin Dashboard";
		if(!checkPermission("admin")){
			<div>Sorry you don't have permission to view this page. Please see the leadership team to get acces.</div>
		}
		return (
		<div>
			<h1>Admin Dashboard</h1>
			<div className="row">
				<div className="col-md-6">
					<div className="panel panel-default">
						<div className="panel-heading">
							<h2>Permission Groups</h2>
						</div>
						<div className="panel-body">
							<button className="btn btn-default"
								onClick={this.goToGroups.bind(this)}>View</button>
						</div>
					</div>
				</div>
				<div className="col-md-6">
					<div className="panel panel-default">
						<div className="panel-heading">
							<h2>Area Permissions</h2>
						</div>
						<div className="panel-body">
							<button className="btn btn-default"
								onClick={this.goToPermissions.bind(this)}>View</button>
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-md-6">
					<div className="panel panel-default">
						<div className="panel-heading">
							<h2>Site Settings</h2>
						</div>
						<div className="panel-body">
							<button className="btn btn-default"
								onClick={this.goToSettings.bind(this)}>View</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		)
	}
}
