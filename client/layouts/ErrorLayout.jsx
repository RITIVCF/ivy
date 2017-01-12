import React from 'react';
import SignInButtonWrapper from '/client/user/SignInButtonWrapper.jsx';
//import NavBar from './NavBar.jsx';
import Header from './Header.jsx';
import SideBar from './SideBar.jsx';
import SideBarMobile from './SideBarMobile.jsx'

// <nav className="navbar navbar-default nabar-cls-top" role="navigation" style={margin-bottom: "0"} >
// <img src="images/userpics/account.png" class="img-thumbnail" />
// Print user's Name here

export const ErrorLayout = ({content}) => (
	<div>
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
				<Header header={"Error..."}/>
				<SideBar />
				<SideBarMobile />
      	<main>
					{content}
				</main>
				<footer>
				</footer>
	</div>
)
