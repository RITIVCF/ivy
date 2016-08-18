import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Page from './Page.jsx';

export default class PagePermissionsForm extends TrackerReact(React.Component) {
	constructor(){
		super();

	}

	getPages(){
		return PagePermissions.find().fetch();
	}

	render() {
		return (
		<div>
			<h1>Page Permissions Dashboard</h1>
			{this.getPages().map( (page) => {
				return <Page page={page} />
			})}
		</div>
		)
	}
}
