import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SignInButtonWrapper from '/client/user/SignInButtonWrapper.jsx';


export default class SideBarMobile extends TrackerReact(React.Component) {
	constructor(){
		super();

		this.state = {
			navCollapsed: false,
			subscription: {

			}
		}


	}

	componentDidMount(){
		$(".dropdown-button").dropdown();
		$("#nav-mobile").appendTo('body');
		$(".button-collapse").sideNav({
			draggable: true,
			closeOnClick: true
		});
	}

	componentDidUpdate(){
		$(".dropdown-button").dropdown();
		$('.collapsible').collapsible();
	}

	getContact(){
		return Meteor.user()?Meteor.user().name:"";
	}

	render(){
		return(

		<ul id="nav-mobile" className="side-nav">
			<li>
				<div className="userView">
		      <div className="background">
		        <img src="images/defaultEvent.png" />
		      </div>
		      <a href="#!user"><img className="circle" src="images/defaultPic.png" /></a>
		      <a href="#!name"><span className="white-text name">{this.getContact()}</span></a>
		    </div>
			</li>
			<li className={FlowRouter.current().path=="/"?"active":""}>
						<a href="/" className="waves-effect collapsible-header">
							<span className="nav-icon">
								<i className="material-icons">dashboard</i>
							</span>
							<span className="nav-label">My Dashboard</span>
						</a>
					</li>
					{Groups.find({$or:[{leader: Meteor.userId()},{users: Meteor.userId()}], type:"Small Group"}).fetch().length>0?
					<li className={FlowRouter.current().path=="/mysg"?"active":""}>
						<a href="/mysg" className="waves-effect collapsible-header">
							<span className="nav-icon">
								<i className="material-icons">forum</i>
							</span>
							<span className="nav-label">My Small Group</span>
						</a>
					</li>:""}
					{/*checkPermission("events")?*/}
						<li className={FlowRouter.current().path.substring(0,7)=="/events"?"active":""}>
							<a className="waves-effect collapsible-header" href="/events">
								<span className="nav-icon">
									<i className="material-icons">today</i>
								</span>
								<span className="nav-label">Events</span>
							</a>
						</li>{/*}:""*/}
					{checkPermission("tickets")?
						<li className={FlowRouter.current().path.substring(0,8)=="/tickets"?"active":""}>
							<a className="waves-effect collapsible-header" href="/tickets">
								<span className="nav-icon">
									<i className="material-icons">receipt</i>
								</span>
								<span className="nav-label">To-Dos</span>
							</a>
						</li>:""}
						{checkPermission("emails")&&
							<li className={FlowRouter.current().path.substring(0,7)=="/emails"&&"active"}>
								<a className="waves-effect collapsible-header" href="/emails">
									<span className="nav-icon">
										<i className="material-icons">email</i>
									</span>
									<span className="nav-label">Emails</span>
								</a>
							</li>}
					{checkPermission("contacts")?
						<li className={FlowRouter.current().path.substring(0,9)=="/contacts"?"active":""}>
							<a className="waves-effect collapsible-header" href="/contacts">
								<span className="nav-icon">
									<i className="material-icons">supervisor_account</i>
								</span>
								<span className="nav-label">People</span>
							</a>
						</li>:""}
					{checkPermission("churches")?
						<li className={FlowRouter.current().path.substring(0,9)=="/churches"?"active":""}>
							<a className="waves-effect collapsible-header" href="/churches">
								<span className="nav-icon">
									<i className="material-icons">store</i>
								</span>
								<span className="nav-label">Churches</span>
							</a>
						</li>:""}
					{!checkPermission("admin")?"":
						<li className="no-padding">
							<ul className="collapsible collapsible-accordion">
					<li>
						<a className="collapsible-header">
							<span className="nav-icon">
								<i className="material-icons">perm_data_setting</i>
							</span>
							<span className="nav-label">Administration
								<i id="drop-nav" className="material-icons right">arrow_drop_down</i>
							</span>
						</a>
						<div className="collapsible-body">
							<ul>
								<li className={FlowRouter.current().path.substring(0,13)=="/admin/groups"?"active":""}>
									<a href="/admin/groups">
										<i className="material-icons">recent_actors</i>Structures
									</a>
								</li>
								<li className={FlowRouter.current().path.substring(0,15)=="/admin/settings"?"active":""}>
									<a href="/admin/settings">
										<i className="material-icons">settings</i>Site Settings
									</a>
								</li>
								<li className={FlowRouter.current().path.substring(0,24)=="/admin/duplicatecontacts"?"active":""}>
									<a href="/admin/duplicatecontacts">
										<i className="material-icons">call_merge</i>Duplicate Contacts
									</a>
								</li>
								{checkPermission("feedback")?
									<li className={FlowRouter.current().path.substring(0,9)=="/feedback"?"active":""}>
										<a href="/feedback">
											<i className="material-icons">swap_vert</i>Feedback
										</a>
									</li>:""}
								<li className={FlowRouter.current().path.substring(0,14)=="/admin/overiew"?"active":""}>
									<a href="/admin/overview">
										<i className="material-icons">assessment</i>Chapter Overview
									</a>
								</li>
							</ul>
						</div>
					</li>
				</ul>
			</li>
		}
		</ul>

		)

	}
}
