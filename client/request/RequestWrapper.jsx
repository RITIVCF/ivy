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
		<div className="panel panel-default">
			{!(this.props.parent.state.subscription.users.ready()&&this.props.parent.state.subscription.contacts.ready()&&this.props.perm) ? "":
			<NewTicketWindow ref="newticketoverlay" parent={this} eid={this.props.eid} />}
			<div className="panel-heading"><h3>{this.props.perm?<button
				onClick={this.openOverlay.bind(this)}
				className="btn btn-primary pull-right btn-lg"
				disabled={!this.props.parent.state.subscription.users.ready()}
				>New Request</button>:<div></div>}Requests</h3>
				</div>
				<table className={checkPermission("tickets")?"table table-striped table-hover table-responsive":"table table-striped table-responsive"}>
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
                    return <RequestSingle key={ticket._id} perm={this.props.perm} request={ticket} />
                }):""}
							</tbody>
            </table>
		</div>
		)
	}
}
