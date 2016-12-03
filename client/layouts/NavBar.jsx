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

		if(!Session.get("view")){
      Session.set("view","Tile");
    }
	}

	componentDidMount(){
		$(".dropdown-button").dropdown();
	}

	componentDidUpdate(){
		$(".dropdown-button").dropdown();
		$(".button-collapse").sideNav();
		$('.collapsible').collapsible();
	}

	getContact(){
		//console.log(Meteor.user());

		return Contacts.findOne(Meteor.user().contact)?Contacts.findOne(Meteor.user().contact).name:"";

	}
	getContactEmail(){
		//console.log(Meteor.user());

		return Contacts.findOne(Meteor.user().contact)?Contacts.findOne(Meteor.user().contact).email:"";

	}

	toggleInfoBar(){
		Session.set("infobar", !Session.get("infobar"));
	}

	toggleView(){
		if(Session.get("view")=="List"){
			Session.set("view","Tile");
		}
		else{
			Session.set("view", "List");
		}
	}

	render(){
		return(
			<div>
			<div className="navbar-fixed">
				<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
					<ul id="userdrop" className="dropdown-content">
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
			<nav>

				<div className="nav-wrapper blue z-depth-2">
					<a href="/" className="brand-logo">Ivy</a>
					<a href="#" data-activates="nav-mobile" className="button-collapse"><i className="material-icons">menu</i></a>
					<a >{this.props.header}</a>
					<ul	className="right hide-on-med-and-down">

						<li className={Session.get("infobar")?"active":""}>
							<a 	onClick={this.toggleInfoBar.bind(this)} >{Session.get("infobar")?<i className="material-icons">info</i>:<i className="material-icons">info_outline</i>}</a>
						</li>
						<li className="active">
							<a onClick={this.toggleView.bind(this)} >{Session.get("view")=="List"?<i className="material-icons">view_list</i>:<i className="material-icons">view_module</i>}</a>
						</li>
						<li>
							 <a className="dropdown-button" data-activates="userdrop">
								 {Meteor.user()?Meteor.user().contact?this.getContact():"User":""}
								 <i className="material-icons right">arrow_drop_down</i></a>
					 </li>

					</ul>
				</div>
			</nav>
			</div>
			<ul id="slide-out" className="side-nav fixed gray z-depth-1" >




								<li className="no-padding">
									<ul className="collapsible collapsible-accordion">
										<li className={FlowRouter.current().path=="/"?"active":""}>
											<a href="/" className="waves-effect collapsible-header">My Dashboard</a>
										</li>
										{/*checkPermission("events")?*/}
											<li className={FlowRouter.current().path.substring(0,7)=="/events"?"active":""}>
												<a className="waves-effect collapsible-header" href="/events">Events</a>
											</li>{/*}:""*/}
										{checkPermission("tickets")?
											<li className={FlowRouter.current().path.substring(0,8)=="/tickets"?"active":""}>
												<a className="waves-effect collapsible-header" href="/tickets">Ticket Dashboard</a>
											</li>:""}
										{checkPermission("contacts")?
											<li className={FlowRouter.current().path.substring(0,9)=="/contacts"?"active":""}>
												<a className="waves-effect collapsible-header" href="/contacts">Contact Dashboard</a>
											</li>:""}
										{checkPermission("churches")?
											<li className={FlowRouter.current().path.substring(0,9)=="/churches"?"active":""}>
												<a className="waves-effect collapsible-header" href="/churches">Churches Dashboard</a>
											</li>:""}
										<li>
											<a className="collapsible-header">Administration<i className="material-icons right">arrow_drop_down</i></a>
											<div className="collapsible-body">
												<ul>
													<li className={FlowRouter.current().path.substring(0,12)=="/admin/users"?"active":""}>
														<a href="/admin/users">User Management</a>
													</li>
													<li className={FlowRouter.current().path.substring(0,13)=="/admin/groups"?"active":""}>
														<a href="/admin/groups">Groups Management</a>
													</li>
												{/*}	<li>
														<a href="/admin/pages">Page Permissions</a>
													</li> */}
													<li className={FlowRouter.current().path.substring(0,15)=="/admin/settings"?"active":""}>
														<a href="/admin/settings">Site Settings</a>
													</li>
													<li className={FlowRouter.current().path.substring(0,24)=="/admin/duplicatecontacts"?"active":""}>
														<a href="/admin/duplicatecontacts">Duplicate Contacts</a>
													</li>
													{checkPermission("feedback")?
														<li className={FlowRouter.current().path.substring(0,9)=="/feedback"?"active":""}>
															<a href="/feedback">Feedback</a>
														</li>:""}
													<li className={FlowRouter.current().path.substring(0,14)=="/admin/overiew"?"active":""}>
														<a href="/admin/overview">Chapter Overview</a>
													</li>
												</ul>
											</div>
										</li>
									</ul>
								</li>

			    </ul>
			</div>









		)

	}
}
