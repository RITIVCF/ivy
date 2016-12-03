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
			{/*style={{transform: translateX(0%)}}*/}
		  <li className="bold"><a href="#!" className="waves-effect waves-teal">Dashboard</a></li>
		  <li className="bold"><a href="#!" className="waves-effect waves-teal">Churches</a></li>
		  <li className="no-padding">
		    <ul className="collapsible collapsible-accordion">
		  	<li className="bold"><a className="collapsible-header  waves-effect waves-teal">Events</a>
		  	  <div className="collapsible-body">
		  		<ul>
		  		  <li><a href="#!">Event thing</a></li>
		  		  <li><a href="#!">Another event thing</a></li>
		  		</ul>
		  	  </div>
		  	</li>
		  	<li className="bold"><a className="collapsible-header active waves-effect waves-teal">Administrator</a>
		  	  <div className="collapsible-body" style={{display: "block"}} >
		  		<ul>
		  		  <li><a href="#!">Groups</a></li>
		  		  <li><a href="#!">Users</a></li>
		  		  <li><a href="#!">Settings</a></li>
		  		  <li><a href="#!">Permissions</a></li>
		  		</ul>
		  	  </div>
		  	</li>
		  </ul>
		</li>
		</ul>

		)

	}
}
