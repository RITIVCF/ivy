import React from 'react';
import SignInButtonWrapper from '/client/user/SignInButtonWrapper.jsx';
import NavigationWrapper from './NavigationWrapper.jsx';
import Header from './Header.jsx';

export var MainLayout = ({header, content}) => (   // export const MainLayout
	<div>
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
				<Header header={header}/>
				<NavigationWrapper />
      	<main>
					{content}
				</main>
	</div>
)
