import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Chart from 'chart.js'

export default class FunnelChart extends TrackerReact(React.Component) {
	constructor(){
		super();

		this.state = {
			ttl: "",
			mounted: false
		};
	}

	componentDidMount(){
		console.log("did mount");
		thiz = this;
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
											max: ((result.max + 2))<50?(result.max+2):(result.max+5),
	                    beginAtZero:true
	                }
	            }]
	        }
	    }
			});
			var total = parseInt(result.Crowd)+
									parseInt(result.Visitor)+
									parseInt(result.Member)+
									parseInt(result.Server)+
									parseInt(result.Leader)+
									parseInt(result.Multiplier);
				thiz.setState({ttl: total});
		});
		this.setState({mounted: true});
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
			<div>
					Funnel Status - Current | <b>Total:</b> {this.state.ttl} <br/>
				<button onClick={this.refresh.bind(this)} className="btn waves-effect waves-light">Refresh</button>
					<canvas id="funnelchart" width="400" height="400"></canvas>
			</div>
		)
	}
}
