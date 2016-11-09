import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Chart from 'chart.js'

export default class FunnelChart extends TrackerReact(React.Component) {
	constructor(){
		super();


	}

	componentDidMount(){
		console.log("did mount");
		Meteor.call("currentFunnel", function(error, result){
			snapshotChart = new Chart($(funnelchart), {
				type: "bar",
				data: {
					labels: ["Crowd", "Visitor", "Member", "Server", "Leader", "Multiplier"],
					datasets: [{
						label: "Counts",
						data: [result.Crowd, result.Visitor, result.Member, result.Server, result.Leader, result.Multiplier]
					}]
				},
	    	options: {
	        scales: {
	            yAxes: [{
	                ticks: {
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
			snapshotChart.data.datasets[0]= {
				label: "Counts",
				data: [result.Crowd, result.Visitor, result.Member, result.Server, result.Leader, result.Multiplier]
			};
			snapshotChart.update();
		});
	}


	render() {
		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					Funnel Status - Current
				</div>
				<div className="panel-body">
					<button onClick={this.refresh.bind(this)} className="btn btn-success">Refresh</button>
					<canvas id="funnelchart" width="400" height="400"></canvas>
				</div>
			</div>
		)
	}
}
