import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { HTTP } from 'meteor/http';
import FeedbackForm from './feedback/FeedbackForm.jsx';
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

	getEvents(){
		return Events.find({signupreq: true}).fetch();
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
		<div className="row">
			<div className="col-sm-3 col-lg-2">
				<nav className="navbar navbar-default navbar-fixed-side">

				</nav>
			</div>
			<div className="col-sm-9 col-lg-10">
				<h1>My Dashboard</h1>
				<h2>Welcome to Ivy</h2>
				<div className="row">
					<div className="col-sm-6">
						<div className="panel panel-primary">
							<div className="panel-heading">
							</div>
							<div className="panel-body">
								This system is not compatible with Safari. If you are using Safari, please use a different browser.
								<br /><br />Thank you. -RIT IVCF Web Development Team
							</div>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="panel panel-default">
							<div className="panel-heading">
								Upcoming Event Service Requests
							</div>
							<div className="panel-body">
								<div className="list-group">
									{this.getEvents().map((event)=>{
										return <a href={"/events/signups/"+event._id} className="list-group-item">
											<h4 className="list-group-item-heading">{event.name}</h4>
											<p className="list-group-item-text">{event.reqmessage}</p>
										</a>
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-6">
						<FeedbackForm />
					</div>
				</div>
			</div>
		</div>
		)
	}
}
