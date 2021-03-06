import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Chart from 'chart.js'
//import noUiSlider from '../../styles/js/nouislider.js';

export default class FunnelTime extends TrackerReact(React.Component) {
	constructor(){
		super();

		this.state = {
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
		Meteor.call("funnelTime", this.refs.date.value, function(error, result){
			historicalChart = new Chart($(historicalchart), {
				type: "line",
				data: {
					labels: result.timestamp,
					datasets: [
						// Alex - v1.0.11 - 4/30/17
						// Do we want 'Contact' status on the history chart?
						// or do we wait for better data visualization
						// choices? I think that would be better
						// {
						// 	label: "Contact",
						// 	backgroundColor: thiz.state.colors.contact,
						// 	data: result.contact
						// },
						{
							label: "Crowd",
							backgroundColor: thiz.state.colors.crowd,
							data: result.crowd
						},
						{
							label: "Visitor",
							backgroundColor: thiz.state.colors.visitor,
							data: result.visitor
						},
						{
							label: "Member",
							backgroundColor: thiz.state.colors.member,
							data: result.member
						},
						{
							label: "Server",
							backgroundColor: thiz.state.colors.server,
							data: result.server
						},
						{
							label: "Leader",
							backgroundColor: thiz.state.colors.leader,
							data: result.leader
						},
						{
							label: "Multiplier",
							backgroundColor: thiz.state.colors.multiplier,
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
	        },
					legend: {
              onClick: (e) => e.stopPropagation()
          }
	    }
			});
		});

	}


	refresh(){
		let thiz = this;
		Meteor.call("funnelTime", this.refs.date.value, function(error, result){
			historicalChart.data.labels = result.timestamp;
			historicalChart.options.scales.yAxes[0].ticks.max = result.max;
			historicalChart.options.scales.yAxes[0].ticks.min = result.min;
			historicalChart.data.datasets[0]= {
				label: "Crowd",
				backgroundColor: thiz.state.colors.crowd,
				data: result.crowd
			};
			historicalChart.data.datasets[1]= {
				label: "Visitor",
				backgroundColor: thiz.state.colors.visitor,
				data: result.visitor
			};
			historicalChart.data.datasets[2]= {
				label: "Member",
				backgroundColor: thiz.state.colors.member,
				data: result.member
			};
			historicalChart.data.datasets[3]= {
				label: "Server",
				backgroundColor: thiz.state.colors.server,
				data: result.server
			};
			historicalChart.data.datasets[4]= {
				label: "Leader",
				backgroundColor: thiz.state.colors.leader,
				data: result.leader
			};
			historicalChart.data.datasets[5]= {
				label: "Multiplier",
				backgroundColor: thiz.state.colors.multiplier,
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

					Historical
					{/*}<i onClick={this.refresh.bind(this)}
						className="material-icons unselectable"
						style={{float: "right"}}>cached</i>*/}

					{/*}<button  className="btn waves-effect waves-light"></button>
						<label>Date Range</label>
							<div id="daterange" />
						<label>Start: </label><p id="from">{this.state.start}</p>
						<label>End: </label><p id="to">{this.state.end}</p>
				      {/*}<input type="range" id="daterange" min="0" max="100" />*/}

					<select className="browser-default" ref="date" defaultValue="30" onChange={this.refresh.bind(this)}>
						<option value="1" >Past 1 Days</option>
						<option value="2" >Past 2 Days</option>
						<option value="15" >Past 15 Days</option>
						<option value="30" >Past 30 Days</option>
						<option value="60" >Past 60 Days</option>
						<option value="90" >Past 90 Days</option>
						<option value="180" >Past 180 Days</option>
						<option value="360" >Past 360 Days</option>
						<option value="0" >All time</option>
					</select>
					<canvas id="historicalchart" width="400" height="400"></canvas>

			</div>
		)
	}
}
