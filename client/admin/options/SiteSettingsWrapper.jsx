import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SiteSettingsForm from './SiteSettingsForm.jsx';


export default class SiteSettingsWrapper extends TrackerReact(React.Component) {
	constructor(){
		super();


	}

	render() {
		document.title="Ivy - Site Settings";
		if(!checkPermission("admin")){
			return <div>Sorry you don't have permission to view this page. Please see the leadership team to get acces.</div>
		}
		return (
		<div>
			<SiteSettingsForm />
		</div>
		)
	}
}
