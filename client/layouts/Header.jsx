import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SignInButtonWrapper from '/client/user/SignInButtonWrapper.jsx';


export default class Header extends TrackerReact(React.Component) {
	constructor(){
		super();

		this.state = {
			subscription: {

			}
		}


	}

	componentDidMount(){
		$("#userprofilebutton").dropdown();
		$("#userprofilebuttonmobile").dropdown({
			constrainWidth: false,
			alignment: "right"
		});

	}

	componentDidUpdate(){
		// $("#userprofilebutton").dropdown();
		// $("#userprofilebuttonmobile").dropdown({
		// 	constrainWidth: false,
		// 	alignLeft: false
		// });

	}

	goBack(){
		window.history.back();
	}

	getContact(){
		//console.log(Meteor.user());

		return Meteor.user()?Meteor.user().name:"";

	}
	getContactEmail(){
		//console.log(Meteor.user());

		return Meteor.user()?Meteor.user().emails[0].address:"";

	}


	render(){
		return(
			<header>
				<nav className="z-depth-1">
					<div className="nav-wrapper row indigo darken-4">
						<ul className="left">
							<li><a onClick={this.goBack.bind(this)}><i className="material-icons">arrow_back</i></a></li>
						</ul>
						<a href="#" data-activates="nav-mobile" className="button-collapse"><i className="material-icons">menu</i></a>
						<a href="/" className="brand-logo">{/*Ivy &nbsp; |&nbsp; */}{this.props.header}</a>
						<ul className="right hide-on-med-and-down">
							{/*}<li><a href="#!"><i className="material-icons">search</i></a></li>*/}
								<li><a href="mobile.html"></a></li>
							<li><a id="userprofilebutton" className="dropdown-button" data-activates="userdrop">{this.getContact()}<i className="material-icons right">more_vert</i></a></li>
						</ul>
						{/*}<ul className="right hide-on-large-only">
							<li><a id="userprofilebuttonmobile" className="dropdown-button" data-activates="userdropmobile"><i className="material-icons right">account_box</i></a></li>
						</ul>*/}
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
					{/*}<ul id="userdropmobile" className="dropdown-content">
						<li>
							<a href="/profile">My Profile</a>
						</li>
						<li>
							<a href="/changepassword">Change Password</a>
						</li>
						<li>
							<SignInButtonWrapper />
						</li>
					</ul>*/}
				</nav>
			</header>









		)

	}
}
