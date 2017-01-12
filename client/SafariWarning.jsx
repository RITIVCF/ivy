import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';


export default class SafariWarning extends TrackerReact(React.Component) {
	constructor(){
		super();

	}



	render() {

		return (

			<div className="card">
				<div className="card-content">
					<p>This system is not compatible with Safari. If you are using Safari, please use a different browser.
					<br /><br />Thank you. -RIT IVCF Web Development Team</p>
				</div>
			</div>






		)
	}
}
