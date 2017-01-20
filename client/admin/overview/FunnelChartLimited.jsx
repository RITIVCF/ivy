import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Chart from 'chart.js'

export default class FunnelChartLimited extends TrackerReact(React.Component) {
	constructor(){
		super();

		this.state = {
			ttl: "",
			mounted: false
		}

	}

	componentDidMount(){
		console.log("did mount");
		var thiz = this;
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
					Limited | <b>Total:</b> {this.state.ttl}
					<i onClick={this.refresh.bind(this)}
						className="material-icons unselectable"
						style={{float: "right"}}>cached</i>
				</div>
				<div className="panel-body">
					{/*}<button  className="btn waves-effect waves-light"></button>*/}

					<canvas id="funnelchart2" width="400" height="400"></canvas>
				</div>
			</div>
		)
	}
}
