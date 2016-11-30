import React from 'react';
import SignInButtonWrapper from '/client/user/SignInButtonWrapper.jsx';
import NavBar from './NavBar.jsx';
import InfoBarMain from './InfoBarMain.jsx';


// <nav className="navbar navbar-default nabar-cls-top" role="navigation" style={margin-bottom: "0"} >
// <img src="images/userpics/account.png" class="img-thumbnail" />
// Print user's Name here

export var InfoBarLayout = ({content}) => (   // export const MainLayout
	<div className="wrapper">
				<NavBar />
      	<InfoBarMain content={content} />
				<footer>
				</footer>
	</div>
)

/*}
	<div className=""
		<nav id="nav">
			<ul>
				<li><AccountsUIWrapper /></li>
				{/*<li class="current"><a href="/forms/contact">Select Contact Form</a></li>
				<li class="current"><a href="/ethnicity">Add Ethnicity</a></li>}
				<li className="current"><a href="/events">Events Dashboard</a></li>
				<li className="current"><a href="/calendar">Event Calendar</a></li>
				<li className="current"><a href="/churches">Churches Dashboard</a></li>
				<li className="current"><a href="/sg">Small Groups Dashboard</a></li>
			</ul>
		</nav>
	*/
