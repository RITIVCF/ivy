import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Event from './Event.jsx';

export default class DebriefSummary extends TrackerReact(React.Component) {
	constructor() {
    super();

		this.state = {
			show: true
		}
  }

	handleSearchChange(event){
		this.setState({search: event.target.value});
	}

	NoBrief(){
		return Events.find({debrief: {$exists: false}},{sort: {start: -1}}).fetch();
	}

	showHide(){
		this.setState({show: !this.state.show});
	}

	render() {
		let nobrief = this.NoBrief();
		if ( !(nobrief.length > 0) ) {
			return <AllCompleteMessage />
		}

		return (
			<Card
				title="Pending Debrief"
				table={this.state.show&&
					<table className="responsive-table">
						<thead>
							<tr>
								<th>Name</th>
								<th>Start</th>
								<th>Type</th>
								<th>Leader</th>
							</tr>
						</thead>
						<tbody>
							{nobrief.map( (event) => {
								return <Event key={event._id} ev={event} />
							})}
						</tbody>
					</table>}
			>
				<a className="btn-flat right"	onClick={this.showHide.bind(this)}>
					<i className="material-icons">{this.state.show?"expand_less":"expand_more"}</i>
				</a>
			</Card>
		)
	}
}



function AllCompleteMessage(){
	return (
		<Card>
			<p>All debriefs complete.</p>
		</Card>
	)
}
