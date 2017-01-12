import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import RequestSingle from './RequestSingle.jsx';
import NewRequestModal from './NewRequestModal.jsx';


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

	newRequest(){
		this.refs.newreqmodal.open();
	}

	render() {

		return (
		<div className="">
			<div className="divider"></div>
			{this.props.perm&&<NewRequestModal ref="newreqmodal" parent={this} eid={this.props.eid} />}
			<div>
				{this.props.perm&&<button
					onClick={this.newRequest.bind(this)}
					className="btn"
					style={{float: "right" }}
					>New Request</button>}
				<h3>Requests</h3>
				</div>
				<table className={checkPermission("tickets")?"striped highlight":"striped"}>
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
						{this.requests().map( (ticket)=>{
	              return <RequestSingle key={ticket._id} perm={this.props.perm} request={ticket} />
	          })}
					</tbody>
	      </table>
		</div>
		)
	}
}
