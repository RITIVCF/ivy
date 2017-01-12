import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import FunnelChart from './FunnelChart.jsx';
import FunnelChartLimited from './FunnelChartLimited.jsx';
import FunnelTime from './FunnelTime.jsx';

export default class OverviewPage extends TrackerReact(React.Component) {
	constructor(){
		super();


	}

	componentWillUnmount() {

	}

	render() {
		return (
			<div className="container">
					<div className="row">
						<div className="col s12 m6">
							<FunnelChart ref="funnelchart" />
						</div>
						<div className="col s12 m6">
							<FunnelChartLimited />
						</div>
					</div>
					<div className="row">
						<div className="col s12">
							<FunnelTime />
						</div>
					</div>
			</div>
		)
	}
}
