import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';


export default class NoPerm extends TrackerReact(React.Component) {

	render() {
		return (
			<div className="center-align" style={{paddingTop:"50px"}}>
				<div className="card-panel">
					<div className="card-content">
						<p>Sorry. It looks like you don't have permission to view this page. Please check with your leadership team to get access.</p>
					</div>
				</div>
			</div>

		)
	}
}
