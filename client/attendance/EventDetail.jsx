import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Attendee from './Attendee.jsx';


//Events = new Mongo.Collection("events");

export default class EventDetail extends TrackerReact(React.Component) {
	constructor() {
    super();

    this.state = {
      subscription: {
        Events: Meteor.subscribe("allEvents")
      }
    };
  }

  componentWillUnmount() {
    this.state.subscription.Events.stop();
  }

	getEvent(){
		//console.log(Events.find({_id: this.props.eid}).fetch());
		//return Events.find({_id: this.props.eid}).fetch();
		return Events.findOne(this.props.eid);
	}

	render() {
	let ev = this.getEvent();
	console.log(ev);
	if(!ev){
		return (<div>Loading...</div>);
	}

		return (

		<div>
			<article id="main">
        <header className="special container">
          <h2>Event Detail</h2>
        </header>
			<div className="sidebar">
				<p>Event Name: {ev.name}</p>
				<p>Event Description: {ev.description}</p>
				<p>Attendees:</p>
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>First Time?</th>
							<th>Ticket</th>
						</tr>
					</thead>
					<tbody>
						{ev.attendees.map( (user)=>{
								return <Attendee key={user._id} user={user} />
						})}
					</tbody>
				</table>
			</div>
			</article>
		</div>
		)
	}
}
