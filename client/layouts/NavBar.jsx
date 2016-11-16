import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SignInButtonWrapper from '/client/user/SignInButtonWrapper.jsx';


export default class Navbar extends TrackerReact(React.Component) {
	constructor(){
		super();

		this.state = {
			subscription: {

			}
		}
	}

	componentDidMount(){
		$(".dropdown-button").dropdown();
	}

	getContact(){
		//console.log(Meteor.user());

		return Contacts.findOne(Meteor.user().contact)?Contacts.findOne(Meteor.user().contact).name:"";

	}

	render(){
		return(
			<div className="navbar-fixed">
			<nav>
				<ul id="dropdown1" className="dropdown-content">
				  <li><a href="#!">one</a></li>
				  <li><a href="#!">two</a></li>
				  <li className="divider"></li>
				  <li><a href="#!">three</a></li>
				</ul>
				<ul id="dropdown" className="dropdown-content">
				  <li><a href="#!">one</a></li>
				  <li><a href="#!">two</a></li>
				  <li className="divider"></li>
				  <li><a href="#!">three</a></li>
				</ul>
				<div className="nav-wrapper">
					<a href="/" className="brand-logo">Ivy</a>
					<ul id="nav-mobile"
						className="right hide-on-med-and-down">
						{checkPermission("events")?
							<li>
								<a href="/events">Events</a>
							</li>:""}
						{checkPermission("tickets")?
							<li>
								<a href="/tickets">Ticket Dashboard</a>
							</li>:""}
						{checkPermission("contacts")?
							<li>
								<a href="/contacts">Contact Dashboard</a>
							</li>:""}
						{checkPermission("churches")?
							<li>
								<a href="/churches">Churches Dashboard</a>
							</li>:""}
							<li>
								<a
									className="dropdown-button"
									href="#!"
									data-activates="dropdown1">
									Dropdown
									<i className="material-icons right"></i>
								</a>
							</li>
							<li>
								<a href="/admin/users">User Management</a>
							</li>
							<li>
								<a href="/admin/groups">Groups Management</a>
							</li>
							<li>
								<a href="/admin/pages">Page Permissions</a>
							</li>
							<li>
								<a href="/admin/settings">Site Settings</a>
							</li>
							<li>
								<a href="/admin/duplicatecontacts">Duplicate Contacts</a>
							</li>
							{checkPermission("feedback")?
								<li>
									<a href="/feedback">Feedback</a>
								</li>:""}
							<li>
								<a href="/admin/overview">Chapter Overview</a>
							</li>
							<li>
								<a
									className="dropdown-button"
									href="#!"
									data-activates="dropdown2">
									{Meteor.user()?Meteor.user().contact?this.getContact():"User":""}
									<i className="material-icons right"></i>
								</a>
							</li>
							<li>
								<a href="/profile">My Profile</a>
							</li>
							<li>
								<a href="/changepassword">Change Password</a>
							</li>
							<li>
								<SignInButtonWrapper />
							</li>
					</ul>
				</div>
			</nav>
			</div>









		)

	}
}
