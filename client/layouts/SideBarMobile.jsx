import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SignInButtonWrapper from '/client/user/SignInButtonWrapper.jsx';
import Contact from '/lib/classes/Contact.js';


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
		//$(".dropdown-button").dropdown();
		$("#nav-mobile").appendTo('body');
		$(".button-collapse").sideNav({
			draggable: true,
			closeOnClick: true
		});
		$('.collapsible').collapsible();
	}

	componentDidUpdate(){
		//$(".dropdown-button").dropdown();
		$('.collapsible').collapsible();
	}

	getUserName(){
		return Meteor.user()&&Meteor.user().name;
	}

	getUserEmail(){
		if(Meteor.user()){
			let user = new Contact(Meteor.user());
			return user.getEmail();
		}
		return false;
	}

	goToProfile(){
		FlowRouter.go("/profile");
	}

	render(){
		let children = this.props.children;
		return(

		<ul id="nav-mobile" className="side-nav">
			<li onClick={this.goToProfile.bind(this)}>
				<div className="userView" style={{padding:"16px 16px 0"}}>
		      <div className="background">
		        <img src="images/defaultEvent.png" />
		      </div>
		      <a href="/profile"><img className="circle" src="images/defaultPic.png" /></a>
		      <a href="/profile"><span className="white-text name">{this.getUserName()}</span></a>
					<a href="/profile"><span className="white-text email">{this.getUserEmail()}</span></a>
		    </div>
			</li>

			{children}

			<li>
				<a href="/changepassword">Change Password</a>
			</li>
			<li>
				<SignInButtonWrapper />
			</li>
		</ul>

		)

	}
}
