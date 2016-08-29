import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import PagePermissionsForm from './PagePermissionsForm.jsx';

export default class PagePermissionsWrapper extends TrackerReact(React.Component) {
	constructor(){
		super();


	}

	render() {
		document.title="Ivy - Page Permissions";
		if(!checkPermission("admin")){
			return <div>Sorry you don't have permission to view this page. Please see the leadership team to get acces.</div>
		}
		return (
		<div>
			<PagePermissionsForm />
		</div>
		)
	}
}
