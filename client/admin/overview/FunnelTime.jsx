import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Chart from 'chart.js'

export default class FunnelTime extends TrackerReact(React.Component) {
	constructor(){
		super();

		this.state = {
			mounted: false
		}

	}

	componentDidMount(){
		console.log("did mount");
		Meteor.call("funnelTime", this.refs.date.value, function(error, result){
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
											max: result.max,
											min: result.min,
	                    beginAtZero:true
	                }
	            }]
	        }
	    }
			});
		});
		$( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 500,
      values: [ 75, 300 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );

	}


	refresh(){
		Meteor.call("funnelTime", this.refs.date.value, function(error, result){
			historicalChart.data.labels = result.timestamp;
			historicalChart.options.scales.yAxes[0].ticks.max = result.max;
			historicalChart.options.scales.yAxes[0].ticks.min = result.min;
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
		this.setState({mounted: true});
	}


	render() {
		// if(this.state.mounted){
		// 	this.refresh();
		// }
		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					Funnel Status - Historical
				</div>
				<div className="panel-body">
					<button onClick={this.refresh.bind(this)} className="btn btn-success">Refresh</button>
					<label>Date Range</label>
					<select ref="date">
					  <option value="0" >All time</option>
					  <option value="180" >Past 180 Days</option>
					  <option value="90" >Past 90 Days</option>
						<option value="60" >Past 60 Days</option>
						<option value="30" >Past 30 Days</option>
						<option value="15" >Past 15 Days</option>
						<option value="2" >Past 2 Days</option>
						<option value="1" >Past 1 Days</option>
					</select>
					<input type="text" id="amount" readOnly style={{border:0, color:"#f6931f", fontWeight:"bold"}} />
					{/*}<div id="slider-range"></div>*/}
					<canvas id="historicalchart" width="400" height="400"></canvas>
				</div>
			</div>
		)
	}
}
