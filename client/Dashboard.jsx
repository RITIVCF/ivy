import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { HTTP } from 'meteor/http';
import FeedbackForm from './feedback/FeedbackForm.jsx';
import MySchedule from './widgets/MySchedule.jsx';
import MyEvents from './widgets/MyEvents.jsx';
import MyTickets from './widgets/MyTickets.jsx';
import MyGroups from './widgets/MyGroups.jsx';
import SafariWarning from './SafariWarning.jsx';
//import websocket from 'websocket';

export default class DashboardWrapper extends TrackerReact(React.Component) {
	constructor(){
		super();
		this.state = {
			subscription: {
				user: Meteor.subscribe("userSelf")
			},
			test: "This is a test"
		}
	}

	getEvents(){
		return Events.find({signupreq: true}).fetch();
	}

	handleData(data){
		this.setState({output: "Received message: "+ data});
	}

	safari(){
		return <p>This system is not compatible with Safari. If you are using Safari, please use a different browser.
		<br /><br />Thank you. -RIT IVCF Web Development Team</p>
	}

	render() {
		document.title="Ivy";
		// var websocketclient = websocket.client;
		// var ws = new websocketclient();
		//  HTTP.post("https://slack.com/api/rtm.start?token=xoxp-10806796512-10815334130-64118552720-b6097472a6&pretty=1", function(error, result){
		//  	console.log("Error");
		// 	console.log(error);
		// 	console.log("Result");
		// 	console.log(result);
		// 	ws.connect(result.data.url);
		//  });
		return (
				<div className="row">
					<div className="col s12 m6">
						<SafariWarning />
						<MySchedule />
						<MyTickets />
					</div>
		      <div className="col s12 m6">
							<MyEvents />
							<MyGroups />
							<FeedbackForm />
					</div>

				</div>



		)
	}
}
