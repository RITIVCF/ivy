import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Chart from 'chart.js'

export default class FunnelChartMembership extends TrackerReact(React.Component) {
	constructor(){
		super();

		this.state = {
			ttl: "",
			mounted: false
		}

	}

	componentDidMount(){
		console.log("did mount");
		thiz2 = this;
		Meteor.call("currentFunnelMembership", function(error, result){
			membershipFunnel = new Chart($("#membershipFunnel"), {
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
											//max: ((result.max2 + 2))<50?(result.max2+2):(result.max2+5),
	                    beginAtZero:true
	                }
	            }]
	        }
	    }
			});
			var total = parseInt(result.Visitor?result.Visitor:0)+
									parseInt(result.Member?result.Member:0)+
									parseInt(result.Server?result.Server:0)+
									parseInt(result.Leader?result.Leader:0)+
									parseInt(result.Multiplier?result.Multiplier:0);
				thiz2.setState({ttl: total});
		});
		this.setState({mounted: true});
	}

	refresh(){
		Meteor.call("currentFunnelMembership", function(error, result){
			membershipFunnel.data.datasets[0]= {
				label: "Counts",
				data: [result.Visitor, result.Member, result.Server, result.Leader, result.Multiplier]
			};
			membershipFunnel.update();
		});
	}


	render() {
		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					Funnel Status - Membership | <b>Total:</b> {this.state.ttl}
				</div>
				<div className="panel-body">
					<button onClick={this.refresh.bind(this)} className="btn btn-success">Refresh</button>
					<canvas id="membershipFunnel" width="400" height="400"></canvas>
				</div>
			</div>
		)
	}
}
