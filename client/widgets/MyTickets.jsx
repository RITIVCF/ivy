import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import TicketItem from './TicketItem.jsx';

export default class MyTickets extends TrackerReact(React.Component) {
	constructor(){
		super();

		this.state = {
			subscription: {
				tickets: Meteor.subscribe("MyTickets")
			}
		};

	}

	componentWillUnmount(){
		this.state.subscription.tickets.stop();
	}

	getMeTickets(){
		return Tickets.find({assigneduser: Meteor.userId()}).fetch();
	}

	getGroupTickets(){
		var grps = Groups.find({users: Meteor.userId()}).fetch();
		var ids = [];
		grps.forEach(function(group){
			ids.push(group._id);
		});
		return Tickets.find({assigneduser: "", assignedgroup: {$in: ids}}).fetch();
	}

	getMyTickets(){
		return Tickets.find({submittedby: Meteor.userId()}).fetch();
	}



	render() {
		return (
			<div className="card">
				<div className="card-content">
					<span className="card-title">My To-Dos</span>
					<p>Assigned to Me:</p>
						<ul className="collection">
							{this.state.subscription.tickets.ready()?this.getMeTickets().length!=0?this.getMeTickets().map((t)=>{
								return <TicketItem key={t._id} t={t} />
							}):<li className="collection-item">No tickets assigned to me.</li>:""}
						</ul>
						<p>Unassigned tickets in my group(s):</p>
						<ul className="collection">
							{this.state.subscription.tickets.ready()?this.getGroupTickets().length!=0?this.getGroupTickets().map((t)=>{
								return <TicketItem key={t._id} t={t} />
							}):<li className="collection-item">No unassigned tickets.</li>:""}
						</ul>
						<p>My Submitted Tickets:</p>
						<ul className="collection">
							{this.state.subscription.tickets.ready()?this.getMyTickets().length!=0?this.getMyTickets().map((t)=>{
								return <TicketItem key={t._id} t={t} />
							}):<li className="collection-item">No pending tickets for me.</li>:""}
						</ul>
				</div>
			</div>
		)
	}
}
