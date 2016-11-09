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
			<div className="panel panel-default">
				<div className="panel-heading">
				</div>
				<div className="panel-body">
					<div className="row">
						<div className="col-sm-12 col-md-6">
							<FunnelChart ref="funnelchart" />
						</div>
						<div className="col-sm-12 col-md-6">
							<FunnelChartLimited />
						</div>
					</div>
					<div className="row">
						<div className="col-sm-8">
							<FunnelTime />
						</div>
					</div>
				</div>
			</div>
		)
	}
}
