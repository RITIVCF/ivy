import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Event from './Event.jsx';

export default class DebriefSummary extends TrackerReact(React.Component) {
	constructor() {
    super();

		this.state = {
			show: true,
			search: "",
			filter: []
		}
  }

	handleSearchChange(event){
		this.setState({search: event.target.value});
	}

	Events(){
		let qry = {debrief: {$exists: true}};
		console.log("Search: ", this.state.search);
		console.log("Filter: ", this.state.filter);
		if(this.state.search!=""){
			qry.name={ $regex : this.state.search, $options : 'i'};
		}
		if(this.state.filter.length!=0){
			qry.tags={$in: this.state.filter};
		}
		console.log("Qry: ", qry);
		var events = Events.find(qry,{sort: {start: -1}}).fetch();
		console.log(events);
		return events;
	}

	NoBrief(){
		return Events.find({debrief: {$exists: false}},{sort: {start: -1}}).fetch();
	}

	showHide(){
		this.setState({show: !this.state.show});
	}

	render() {
		let nobrief = this.NoBrief();
		return (
			<div>
				{nobrief.length!=0&&
					<div className="card">
						<div className="card-content"  >
							<span className="card-title">Pending Debrief</span>
							<a className="btn-flat right"	onClick={this.showHide.bind(this)}>
								<i className="material-icons">{this.state.show?"expand_less":"expand_more"}</i></a>
						</div>
						{this.state.show&&
						<table className="responsive-table">
							<thead>
								<tr>
									<th>Name</th>
									<th>Start</th>
									<th>Tag(s)</th>
									<th>Leader</th>
								</tr>
							</thead>
							<tbody>
								{nobrief.map((event)=>{
									return <Event key={event._id} ev={event} />
								})}
							</tbody>
						</table>}
					</div>
				}

				{/*}<div className="card">
					{/*Search tools: type filter, name search
					<div className="card-content">
						<div className="row">
							<div className="col s12 m6">

							</div>
							<div className="input-field col s12 m6">
								<input type="text" id="search" onChange={this.handleSearchChange.bind(this)} />
								<label htmlFor="search">Search</label>
							</div>
						</div>
					</div>
				</div>*/}
				<div className="card">
					<div className="card-content">
						<div className="row">
							<div className="col s12 m6">

							</div>
							<div className="input-field col s12 m6">
								<input type="text" id="search" onChange={this.handleSearchChange.bind(this)} />
								<label htmlFor="search">Search Name</label>
							</div>
						</div>
					</div>
					<table className="responsive-table">
						<thead>
							<tr>
								<th>Name</th>
								<th>Start</th>
								<th>Tag(s)</th>
								<th>Leader</th>
							</tr>
						</thead>
						<tbody>
							{this.Events().map((event)=>{
								return <Event key={event._id} ev={event} />
							})}
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}
