import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SignInButtonWrapper from '/client/user/SignInButtonWrapper.jsx';


export default class SideBar extends TrackerReact(React.Component) {
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

	componentDidUpdate(){
		$(".dropdown-button").dropdown();
		$(".button-collapse").sideNav();
		$('.collapsible').collapsible();
	}


	render(){
		return(

		<ul id="nav-mobile" className="side-nav z-depth-1 fixed" >
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
					{!checkPermission("admin")?"":
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
				}
				</ul>
			</li>
		</ul>

		)

	}
}
