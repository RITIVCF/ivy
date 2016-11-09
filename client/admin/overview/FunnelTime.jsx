import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Chart from 'chart.js'

export default class FunnelTime extends TrackerReact(React.Component) {
	constructor(){
		super();


	}

	componentDidMount(){
		console.log("did mount");
		Meteor.call("funnelTime", function(error, result){
			console.log(result);
			historicalChart = new Chart($(historicalchart), {
				type: "line",
				data: {
					labels: result.timestamp,
					datasets: [{
							label: "Crowd",
							data: result.crowd
						},
						{
							label: "Visitor",
							data: result.visitor
						},
						{
							label: "Member",
							data: result.member
						},
						{
							label: "Server",
							data: result.server
						},
						{
							label: "Leader",
							data: result.leader
						},
						{
							label: "Multiplier",
							data: result.multiplier
						}
					]
				},
	    	options: {
	        scales: {
	            yAxes: [{
									stacked: true,
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
		Meteor.call("funnelTime", function(error, result){
			historicalChart.data.datasets[0]= {
				label: "Crowd",
				data: result.crowd
			};
			historicalChart.data.datasets[1]= {
				label: "Visitor",
				data: result.visitor
			};
			historicalChart.data.datasets[2]= {
				label: "Member",
				data: result.member
			};
			historicalChart.data.datasets[3]= {
				label: "Server",
				data: result.server
			};
			historicalChart.data.datasets[4]= {
				label: "Leader",
				data: result.leader
			};
			historicalChart.data.datasets[5]= {
				label: "Multiplier",
				data: result.multiplier
			};
			historicalChart.update();
		});
	}


	render() {
		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					Funnel Status - Historical
				</div>
				<div className="panel-body">
					<button onClick={this.refresh.bind(this)} className="btn btn-success">Refresh</button>
					<canvas id="historicalchart" width="400" height="400"></canvas>
				</div>
			</div>
		)
	}
}
