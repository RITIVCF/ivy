import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';


export default class DashboardWrapper extends TrackerReact(React.Component) {


	render() {
		document.title="Ivy";
		return (
		<div>
			<h1>My Dashboard</h1>
			<h2>Welcome to Ivy</h2>

		</div>
		)
	}
}
