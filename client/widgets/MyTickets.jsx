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

	getTickets(){
		return Tickets.find().fetch();
	}

	render() {
		return (
			<div className="card">
				<div className="card-content">
					<span className="card-title">My Tickets</span>
						<ul className="collection">
							{this.state.subscription.tickets.ready()?this.getTickets().length!=0?this.getTickets().map((t)=>{
								return <TicketItem key={t._id} t={t} />
							}):<li className="collection-item">No Tickets</li>:""}
						</ul>
				</div>
			</div>
		)
	}
}
