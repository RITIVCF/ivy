import React from 'react';
import Checkbox from '/client/contact/Checkbox.jsx';

export default class JobManagerFilter extends React.Component {
	constructor(){
		super();

		this.state = {
			statuses: ["completed", "waiting", "paused", "ready", "running", "failed", "cancelled"]
		}

	}

	render(){
		return (
			<Row>
				<Column>
					<Card>
						<CardContent>
							<Row>
								<Column width={"s6"}>
									{this.state.statuses.map((status)=>{
										return <Checkbox key={status}
											label={status}
											onChange={this.handleCheck.bind(this, status)}
											checked={this.props.activeStatuses.includes(status)} />
									})}
								</Column>
								<Column width={"s6"}>
									<select onChange={this.handleFilterChange.bind(this)} value={this.props.activeFilter} className="browser-default">
										<option value="">Select a Job Type</option>
										<option value="sendEmail">Send Email</option>
										<option value="email">Email Center Email</option>
										<option value="sendEventFollowUpEmail">Send Event Follow Up</option>
										<option value="checkFunnelStatus">Check Funnel Status</option>
										<option value="processExpiredContacts">Process Expired Contacts</option>
									</select>
								</Column>
							</Row>


						</CardContent>
					</Card>
				</Column>
			</Row>
		)
	}

	handleCheck(status){
		this.props.onToggleStatus(status);
	}

	handleFilterChange(event){
		this.props.onFilterChange(event.target.value);
	}


}
