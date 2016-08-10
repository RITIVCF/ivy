import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import RequestSingle from './RequestSingle.jsx';
import NewTicketWindow from '../tickets/NewTicketWindow.jsx';


//Tickets = new Mongo.Collection("tickets");

export default class RequestWrapper extends TrackerReact(React.Component) {
	constructor(props){
		super(props);
		/*console.log(props);
		this.state = {
			subscription: {
			}
		}*/
	}

	componentWillUnmount(){
		//this.state.subscription.tickets.stop();
	}

	requests() {
		return Tickets.find().fetch();
	}

	openOverlay(){
		this.refs.newticketoverlay.openOverlay();
	}

	render() {

		return (
		<div>
			{!(this.props.parent.state.subscription.users.ready()&&this.props.parent.state.subscription.contacts.ready()) ? "":
			<NewTicketWindow ref="newticketoverlay" parent={this} eid={this.props.eid} />}
			<div>Requests
				<button
					onClick={this.openOverlay.bind(this)}
					disabled={!this.props.parent.state.subscription.users.ready()}
					>New Request</button></div>
						<table className="requests">
							<thead>
								<tr>
								<th>Last Update</th>
								<th>Status</th>
								<th>Quick Description</th>
								<th>Assigned To</th>
								<th>Created</th>
								</tr>
							</thead>
							<tbody>
								{(this.props.parent.state.subscription.tickets.ready()&&this.props.parent.state.subscription.users.ready()&&this.props.parent.state.subscription.contacts.ready()) ? this.requests().map( (ticket)=>{
                    return <RequestSingle key={ticket._id} request={ticket} />
                }):""}
							</tbody>
            </table>
		</div>
		)
	}
}
