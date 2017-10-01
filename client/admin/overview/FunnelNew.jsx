import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Chart from 'chart.js';
import {HorizontalBar} from 'react-chartjs-2';

/*const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};*/


export default class FunnelNew extends TrackerReact(React.Component) {
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
			},
      data: {}
		};
	}

  componentDidMount(){
		let colors = this.state.colors;

		Meteor.call("currentFunnel", (error, result) => {
      this.setState({data: {
				labels: ["Contact", "Crowd", "Visitor", "Member", "Server", "Leader", "Multiplier"],
				datasets: [{
					label: "Counts",
					backgroundColor: [colors.contact, colors.crowd, colors.visitor, colors.member, colors.server, colors.leader, colors.multiplier],
					data: [result.Contact, result.Crowd, result.Visitor, result.Member, result.Server, result.Leader, result.Multiplier]
				}]
			}
      });
		});
			/*var total = parseInt(result.Crowd?result.Crowd:0)+
									parseInt(result.Visitor?result.Visitor:0)+
									parseInt(result.Member?result.Member:0)+
									parseInt(result.Server?result.Server:0)+
									parseInt(result.Leader?result.Leader:0)+
									parseInt(result.Multiplier?result.Multiplier:0);
				thiz.setState({ttl: total});
		});*/
	}

	refresh(){ /*
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
		});*/
	}

  render() {
    console.log("data",this.state.data);
    return (
      <div>
        <HorizontalBar data={this.state.data} options={{
           legend: {
             display: false
           },
           scales: {
             yAxes: [{
               ticks: {
                }
              }],
            xAxes: [{
              ticks: {
               }
              }]
             },
            title: { text: "title" }
         }} />
      </div>
    );
  }
}
