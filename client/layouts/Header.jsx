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


	render(){
		return(
		<nav className="z-depth-1">
			<div className="nav-wrapper row"> 
				<a href="#" data-activates="nav-mobile" className="button-collapse"><i className="material-icons">menu</i></a>
				<a href="#!" className="brand-logo">Logo</a>
				<ul className="right hide-on-med-and-down">
				<li><a href="#!"><i className="material-icons">search</i></a></li>
					<li><a href="mobile.html"></a></li>
				<li><a className="dropdown-button" href="#!" data-activates="dropdown1">{"Alex Eckard"}<i className="material-icons right">more_vert</i></a></li>
			</ul>
			</div>
		</nav>








		)

	}
}
