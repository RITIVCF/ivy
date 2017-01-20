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
		let reqs = this.requests();
		return (
			<div>
				<div className="card">
					<div className="card-content">
						<span className="card-title">Requests</span>
							{this.props.perm&&<button
								onClick={this.newRequest.bind(this)}
								className="btn"
								style={{float: "right" }}
								>New Request</button>}
					</div>
				</div>
				{this.props.perm&&<NewRequestModal ref="newreqmodal" parent={this} eid={this.props.eid} />}
				<div className="card">
					<table className={checkPermission("tickets")?"highlight":""}>
						<thead>
							{reqs.length<=0?
								<tr><td colSpan="5"><p style={{textAlign:"center"}}>No Requests</p></td></tr>
								:<tr>
								<th>Last Update</th>
								<th>Status</th>
								<th>Quick Description</th>
								<th>Assigned To</th>
								<th>Created</th>
							</tr>}

						</thead>
						<tbody>
							{reqs.map( (ticket)=>{
		              return <RequestSingle key={ticket._id} perm={this.props.perm} request={ticket} />
		          })}
						</tbody>
		      </table>
				</div>
			</div>

		)
	}
}
