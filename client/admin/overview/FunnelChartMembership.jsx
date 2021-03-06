import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Chart from 'chart.js'

export default class FunnelChartMembership extends TrackerReact(React.Component) {
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
		}

	}

	componentDidMount(){
		let thiz = this;
		let colors = this.state.colors;
		Meteor.call("currentFunnelMembership", function(error, result){
			membershipFunnel = new Chart($("#membershipFunnel"), {
				type: "bar",
				data: {
					labels: ["Member", "Server", "Leader", "Multiplier"],
					datasets: [{
						//label: "Counts",
						backgroundColor: [colors.member, colors.server, colors.leader, colors.multiplier],
						data: [result.Member, result.Server, result.Leader, result.Multiplier]
					}]
				},
	    	options: {
					legend: false,
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
				thiz.setState({ttl: total});
		});
		this.setState({mounted: true});
	}

	refresh(){
		let thiz= this;
		let colors = this.state.colors;
		Meteor.call("currentFunnelMembership", function(error, result){
			membershipFunnel.data.datasets[0]= {
				label: "Counts",
				backgroundColor: [colors.member, colors.server, colors.leader, colors.multiplier],
				data: [result.Member, result.Server, result.Leader, result.Multiplier]
			};
			var total = parseInt(result.Member?result.Member:0)+
									parseInt(result.Server?result.Server:0)+
									parseInt(result.Leader?result.Leader:0)+
									parseInt(result.Multiplier?result.Multiplier:0);
				thiz.setState({ttl: total});
			membershipFunnel.update();
		});
	}


	render() {
		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					Membership | <b>Total:</b> {this.state.ttl}
					{/*}<i onClick={this.refresh.bind(this)}
						className="material-icons unselectable"
						style={{float: "right"}}>cached</i>*/}
				</div>
				<div className="panel-body">
					{/*}<button  className="btn waves-effect waves-light"></button>*/}

					<canvas id="membershipFunnel" width="400" height="400"></canvas>
				</div>
			</div>
		)
	}
}
