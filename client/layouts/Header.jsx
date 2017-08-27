import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SignInButtonWrapper from '/client/user/SignInButtonWrapper.jsx';


export default class Header extends TrackerReact(React.Component) {
	constructor(){
		super();

	}

	componentDidMount(){
		$("#userprofilebutton").dropdown();
		$("#userprofilebuttonmobile").dropdown({
			constrainWidth: false,
			alignment: "right"
		});

	}

	goBack(){
		window.history.back();
	}

	getContact(){
		return Meteor.user()?Meteor.user().name:"";
	}

	getContactEmail(){
		return Meteor.user()?Meteor.user().emails[0].address:"";
	}


	render(){
		return(
			<header>
				<nav className="z-depth-1">
					<div className="nav-wrapper row iv-blue">
						<a href="#" data-activates="nav-mobile" className="button-collapse" id="mobile-padding-1"><i className="material-icons">menu</i></a>
						<ul className="left">
							<li><a onClick={this.goBack.bind(this)} id="mobile-padding-2"><i className="material-icons">arrow_back</i></a></li>
						</ul>
						<a href="/" id="page-title"className="brand-logo">{this.props.header}</a>
						<ul className="right hide-on-med-and-down">
							<li><a href="mobile.html"></a></li>
							<li><a id="userprofilebutton" className="dropdown-button" data-activates="userdrop">{this.getContact()}<i className="material-icons right">more_vert</i></a></li>
						</ul>
					</div>
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
				</nav>
			</header>
		)
	}
}
