import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SiteSettingsForm from './SiteSettingsForm.jsx';
import NoPerm from '../../NoPerm.jsx';


export default class SiteSettingsWrapper extends TrackerReact(React.Component) {
	constructor(){
		super();


	}

	render() {
		
		if(!checkPermission("admin")){
			return <NoPerm />
		}
		return (
		<div>
			<SiteSettingsForm />
		</div>
		)
	}
}
