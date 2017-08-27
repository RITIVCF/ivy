import React from 'react';
import SignInButtonWrapper from '/client/user/SignInButtonWrapper.jsx';
//import NavBar from './NavBar.jsx';
import InfoBarMain from './InfoBarMain.jsx';

export var InfoBarLayout = ({header,content}) => (   // export const MainLayout
	<div className="wrapper">
				<NavBar header={header} />
      	<InfoBarMain content={content} />
				<footer>
				</footer>
	</div>
)
