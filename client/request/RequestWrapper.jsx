import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import RequestSingle from './RequestSingle.jsx';



Tickets = new Mongo.Collection("tickets");

export default class RequestWrapper extends TrackerReact(React.Component) {
	requests() {
		return Tickets.find().fetch();
	}

	render() {

		return (
		<div>
			<div>Requests<button>New Request</button></div>
						<table className="requests">
							<thead>
								<tr>
								<th>Last Update</th>
								<th>Status</th>
								<th>Description</th>
								<th>Created</th>
								<th>Assigned To</th>
								</tr>
							</thead>
							<tbody>
                {this.requests().map( (tickets)=>{
                    return <RequestSingle key={tickets._id} request={tickets} />
                })}
							</tbody>
            </table>
		</div>
		)
	}
}
