import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Chart from 'chart.js'

export default class FunnelChart extends TrackerReact(React.Component) {
	constructor(){
		super();

		this.state = {
			reset:{
				Contact: "-",
				Crowd: "-",
				Visitor: "-",
				Member: "-",
				Server: "-",
				Leader: "-",
				Multiplier: "-"
			},
			counts: {
				Contact: "-",
				Crowd: "-",
				Visitor: "-",
				Member: "-",
				Server: "-",
				Leader: "-",
				Multiplier: "-"
			},
			ttl: "",
			mounted: false
		};
	}

	componentDidMount(){
		thiz = this;
		Meteor.call("currentFunnel", function(error, result){
			thiz.setState({counts: result});
			var total = parseInt(result.Contact?result.Contact:0)+
									parseInt(result.Crowd?result.Crowd:0)+
									parseInt(result.Visitor?result.Visitor:0)+
									parseInt(result.Member?result.Member:0)+
									parseInt(result.Server?result.Server:0)+
									parseInt(result.Leader?result.Leader:0)+
									parseInt(result.Multiplier?result.Multiplier:0);
			thiz.setState({ttl: total});
						//data: [result.Crowd, result.Visitor, result.Member, result.Server, result.Leader, result.Multiplier]

		});

	}

	refresh(){
		this.setState({counts: this.state.reset});
		var thiz = this;
		Meteor.call("currentFunnel", function(error, result){
			thiz.setState({counts: result});
			var total = parseInt(result.Contact?result.Contact:0)+
									parseInt(result.Crowd?result.Crowd:0)+
									parseInt(result.Visitor?result.Visitor:0)+
									parseInt(result.Member?result.Member:0)+
									parseInt(result.Server?result.Server:0)+
									parseInt(result.Leader?result.Leader:0)+
									parseInt(result.Multiplier?result.Multiplier:0);
			thiz.setState({ttl: total});
		});
	}


	render() {
		let cnts = this.state.counts;
		return (
			<div>
					Current | <b>Total:</b> {this.state.ttl}
					{/*}<i onClick={this.refresh.bind(this)}
						className="material-icons unselectable"
						style={{float: "right"}}>cached</i>*/}
					<table>
						<thead>
						{/*}	<tr><th colSpan="2">Counts</th></tr>*/}
						</thead>
						<tbody>
							<tr><td>{"Contact"}</td><td>{cnts.Contact}</td></tr>
							<tr><td>{"Crowd"}</td><td>{cnts.Crowd}</td></tr>
							<tr><td>{"Visitor"}</td><td>{cnts.Visitor}</td></tr>
							<tr><td>{"Member"}</td><td>{cnts.Member}</td></tr>
							<tr><td>{"Server"}</td><td>{cnts.Server}</td></tr>
							<tr><td>{"Leader"}</td><td>{cnts.Leader}</td></tr>
							<tr><td>{"Multiplier"}</td><td>{cnts.Multiplier}</td></tr>
						</tbody>
					</table>
			</div>
		)
	}
}
