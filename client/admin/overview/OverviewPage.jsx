import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import FunnelChart from './FunnelChart.jsx';
import FunnelChartLimited from './FunnelChartLimited.jsx';
import FunnelChartMembership from './FunnelChartMembership.jsx';
import FunnelTime from './FunnelTime.jsx';

export default class OverviewPage extends TrackerReact(React.Component) {
	constructor(){
		super();


	}

	componentWillUnmount() {

	}

	render() {
		return (
			<div className="row">
				<div className="col s12 l6">
					<div className="row">
						<div className="col s12 m6">
							<div className="card">
								<div className="card-content">
									{/*}<FunnelChart ref="funnelchart" />*/}
									<FunnelChartLimited />
								</div>
							</div>
						</div>
						<div className="col s12 m6">
							<div className="card">
								<div className="card-content">
									<FunnelChartMembership />
								</div>
							</div>
						</div>
					</div>
					{/*}<div className="row">
						<div className="col s12 m6">
							<div className="card">
								<div className="card-content">

								</div>
							</div>
						</div>
					</div>*/}
				</div>
				<div className="col s12 l6">
					<div className="col s12">
						<div className="card">
							<div className="card-content">
								<FunnelTime />
							</div>
						</div>
					</div>
				</div>
			</div>

		)
	}
}

/*}	<div>
			<div className="row">
				<div className="col s12 m6">
					<FunnelChart ref="funnelchart" />
				</div>
				<div className="col s12 m6">
					<FunnelChartLimited />
				</div>
			</div>
			<div className="row">
				<div className="col s12 m6">
					<FunnelChartMembership />
				</div>
				<div className="col s12 m6">
				</div>
			</div>
			<div className="row">
				<div className="col s12">
					<FunnelTime />
				</div>
			</div>
	</div>*/
