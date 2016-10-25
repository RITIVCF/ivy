import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class AdminDashboard extends TrackerReact(React.Component) {
	constructor(){
		super();

	}

	goToGroups(){
		FlowRouter.go("/admin/groups");
	}

	goToUsers(){
		FlowRouter.go("/admin/users");
	}

	goToPermissions(){
		FlowRouter.go("/admin/pages");
	}

	goToSettings(){
		FlowRouter.go("/admin/settings");
	}

	goToFeedback(){
		FlowRouter.go("/feedback");
	}

	goToDuplicateContacts(){
		FlowRouter.go("/admin/duplicatecontacts");
	}

	render() {
		document.title="Ivy - Admin Dashboard";
		if(!checkPermission("admin")){
			<div>Sorry you don't have permission to view this page. Please see the leadership team to get acces.</div>
		}
		return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-sm-3 col-lg-2">
					<nav className="navbar navbar-default navbar-fixed-side">

					</nav>
				</div>
				<div className="col-sm-9 col-lg-10">
					<h1>Admin Dashboard</h1>
					<div className="row">
						<div className="col-md-6">
							<div className="panel panel-default">
								<div className="panel-heading">
									<h2>User Management</h2>
								</div>
								<div className="panel-body">
									<button className="btn btn-default"
										onClick={this.goToUsers.bind(this)}>View</button>
								</div>
							</div>
						</div>
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
					</div>
					<div className="row">
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
					<div className="row">
						<div className="col-md-6">
							<div className="panel panel-default">
								<div className="panel-heading">
									<h2>Duplicate Contacts</h2>
								</div>
								<div className="panel-body">
									<button className="btn btn-default"
										onClick={this.goToDuplicateContacts.bind(this)}>View</button>
								</div>
							</div>
						</div>
					{checkPermission("feedback")?
						<div className="col-md-6">
							<div className="panel panel-default">
								<div className="panel-heading">
									<h2>Feedback Management</h2>
								</div>
								<div className="panel-body">
									<button className="btn btn-default"
										onClick={this.goToFeedback.bind(this)}>View</button>
								</div>
							</div>
						</div>
					:""}
					</div>
				</div>
			</div>
		</div>
		)
	}
}
