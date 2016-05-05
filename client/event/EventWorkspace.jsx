import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import RequestWrapper from '../request/RequestWrapper.jsx';


//Events = new Mongo.Collection("events");

export default class EventWorkspace extends TrackerReact(React.Component) {
	deleteEvent(){
		var result = window.confirm("Are you sure you want to delete event?");
		if(result == true){
			console.log("you clicked 'yes'.");
		}
		else{
			console.log("you clicked 'no'.");
		}
	}

	render() {

		return (
		<div>
			<h1>Event Workspace</h1>
				<h1>Event Workspace</h1>
			<div className="sidebar">

			</div>
			<div className="secondary sidebar">

			</div>
			<div className="Workspace">

			</div>
      <RequestWrapper />
		</div>
		)
	}
}
