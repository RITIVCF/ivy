import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Chart from 'chart.js'

export default class FunnelChartLimited extends TrackerReact(React.Component) {
	constructor(){
		super();


	}

	componentDidMount(){
		console.log("did mount");
		Meteor.call("currentFunnel", function(error, result){
			snapshotChart2 = new Chart($(funnelchart2), {
				type: "bar",
				data: {
					labels: ["Visitor", "Member", "Server", "Leader", "Multiplier"],
					datasets: [{
						label: "Counts",
						data: [result.Visitor, result.Member, result.Server, result.Leader, result.Multiplier]
					}]
				},
	    	options: {
	        scales: {
	            yAxes: [{
	                ticks: {
											max: ((result.max + 2))<50?(result.max+2):(result.max+5),
	                    beginAtZero:true
	                }
	            }]
	        }
	    }
			});
		});
	}

	refresh(){
		Meteor.call("currentFunnel", function(error, result){
			snapshotChart2.data.datasets[0]= {
				label: "Counts",
				data: [result.Visitor, result.Member, result.Server, result.Leader, result.Multiplier]
			};
			snapshotChart2.update();
		});
	}


	render() {
		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					Funnel Status - Current - Membership
				</div>
				<div className="panel-body">
					<button onClick={this.refresh.bind(this)} className="btn btn-success">Refresh</button>
					<canvas id="funnelchart2" width="400" height="400"></canvas>
				</div>
			</div>
		)
	}
}
