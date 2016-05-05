import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';


export default class DashboardWrapper extends TrackerReact(React.Component) {


	render() {
		document.title="RIT IVCF";
		return (
		<div>
			<h1>This is the Ivy Dashboard page.</h1>
			<h1>This is the Ivy Dashboard page.</h1>

		</div>
		)
	}
}
