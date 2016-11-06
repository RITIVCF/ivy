import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import UserRow from './UserRow.jsx';

export default class UserManagementForm extends TrackerReact(React.Component) {
	constructor(){
		super();

	}

	getUsers(){
		return Meteor.users.find().fetch();
	}

	postError(){
		var d = document.getElementById("alertdiv");
		d.innerHTML += "<div class='alert alert-danger alert-dismissible fade in' role='alert'>"+
				"<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
				"	<span aria-hidden='true'>&times;</span></button>"+
				"<strong>Oops!</strong> Looks like something went wrong. Try again later. If the problem persists,"+
				"	contact support.</div>";
	}

	postSuccess(){
		var d = document.getElementById("alertdiv");
		d.innerHTML += "<div class='alert alert-success alert-dismissible fade in' role='alert'>"+
				"<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
				"	<span aria-hidden='true'>&times;</span></button>"+
				"<strong>Success!</strong> Password reset sent.</div>";
	}

	render() {
		return (
			<div>
				<h1>User Management</h1>
				<div className="panel panel-default">
					{/*}<div className="panel-body">

					</div>*/}
					<table className="table table-striped table-hover table-responsive">
						<thead>
							<tr>
								<th>Name</th>
								<th>Email</th>
							</tr>
						</thead>
						<tbody>
							{this.getUsers().map((user)=>{
								return <UserRow key={user._id} uid={user._id} parent={this} />
							})}
						</tbody>
					</table>
				</div>
				<div id="alertdiv">
				</div>
			</div>
		)
	}
}
