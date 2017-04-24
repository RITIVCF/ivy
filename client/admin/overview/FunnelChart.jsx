import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Chart from 'chart.js'

export default class FunnelChart extends TrackerReact(React.Component) {
	constructor(){
		super();

		this.state = {
			ttl: "",
			mounted: false,
			colors: {
				contact: '#999',
				crowd: '#DECF3F',
				visitor: '#B276B2',
				member: '#FAA43A',
				server: '#60BD68',
				leader: '#5DA5DA',
				multiplier: '#F15854'
			}
		};
	}

	componentDidMount(){
		let colors = this.state.colors;
		let thiz = this;
		Meteor.call("currentFunnel", function(error, result){
			snapshotChart = new Chart($(funnelchart), {
				type: "bar",
				data: {
					labels: ["Crowd", "Visitor", "Member", "Server", "Leader", "Multiplier"],
					datasets: [{
						label: "Counts",
						backgroundColor: [colors.crowd, colors.visitor, colors.member, colors.server, colors.leader, colors.multiplier],
						data: [result.Crowd, result.Visitor, result.Member, result.Server, result.Leader, result.Multiplier]
					}]
				},
	    	options: {
					legend: false,
	        scales: {
	            yAxes: [{
	                ticks: {
											// max: ((result.max + 2)) < 50?(result.max+2):(result.max+5),
	                    beginAtZero:true
	                }
	            }]
	        }
	    }
			});
			var total = parseInt(result.Crowd?result.Crowd:0)+
									parseInt(result.Visitor?result.Visitor:0)+
									parseInt(result.Member?result.Member:0)+
									parseInt(result.Server?result.Server:0)+
									parseInt(result.Leader?result.Leader:0)+
									parseInt(result.Multiplier?result.Multiplier:0);
				console.log(total);
				console.log(result);
				thiz.setState({ttl: total}, function(){console.debug("I set it!")});
		});
		//this.setState({mounted: true});
	}

	refresh(){
		Meteor.call("currentFunnel", function(error, result){
			snapshotChart.data.datasets[0]= {
				label: "Counts",
				backgroundColor: [colors.crowd, colors.visitor, colors.member, colors.server, colors.leader, colors.multiplier],
				data: [result.Crowd, result.Visitor, result.Member, result.Server, result.Leader, result.Multiplier]
			};
			var total = parseInt(result.Crowd?result.Crowd:0)+
									parseInt(result.Visitor?result.Visitor:0)+
									parseInt(result.Member?result.Member:0)+
									parseInt(result.Server?result.Server:0)+
									parseInt(result.Leader?result.Leader:0)+
									parseInt(result.Multiplier?result.Multiplier:0);
				thiz.setState({ttl: total});
			snapshotChart.update();
		});
	}


	render() {
		console.debug("Chart total: ", this.state.ttl);
		return (
			<div>
					Current | <b>Total:</b> {this.state.ttl}
					{/*}<i onClick={this.refresh.bind(this)}
						className="material-icons unselectable"
						style={{float: "right"}}>cached</i>*/}
				{/*}<button  className="btn waves-effect waves-light"></button>*/}


					<canvas id="funnelchart" width="400" height="400"></canvas>
			</div>
		)
	}
}
