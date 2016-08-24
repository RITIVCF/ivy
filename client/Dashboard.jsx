import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { HTTP } from 'meteor/http';
//import websocket from 'websocket';

Meteor.subscribe("allGroups");
Meteor.subscribe("allCounters");
Meteor.subscribe("allOptions");
Meteor.subscribe("allPagePermissions");

checkPermission = function(id){
	var grps = Groups.find({users: Meteor.userId()}).fetch();
	var ids = [];
	grps.forEach(function(group){
		ids.push(group._id);
	});

	return PagePermissions.find({_id:id,groups: {$in: ids}}).fetch().length>0;
}

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

	handleData(data){
		this.setState({output: "Received message: "+ data});
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
		<div>
			<h1>My Dashboard</h1>
			<h2>Welcome to Ivy</h2>

		</div>
		)
	}
}
