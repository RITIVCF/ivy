import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Attendee from './Attendee.jsx';


//Events = new Mongo.Collection("events");

export default class EventDetail extends TrackerReact(React.Component) {
	constructor(props) {
    super(props);

    this.state = {
			sort: "First Time",
			filter: "All",
			ev: props.ev
    };
  }

	getAttendees(){
		//var attendees = this.state.ev.attendees.filter(attendee =>
			//attendee[this.state.filter])
			//if(this.state.sort=="Name"){
				this.props.ev.attendees.sort(function(a, b) {
				  var nameA = a.name.toUpperCase(); // ignore upper and lowercase
				  var nameB = b.name.toUpperCase(); // ignore upper and lowercase
				  if (nameA < nameB) {
				    return -1;
				  }
				  if (nameA > nameB) {
				    return 1;
				  }

				  // names must be equal
				  return 0;
			});
	//	}
			if(this.state.sort=="First Time"){
					this.props.ev.attendees.sort(function(x, y) {
					    //return (x.firsttime === y.firsttime)? 0 : x.firsttime? -1 : 1;
							return y.firsttime-x.firsttime;
					});
		}

		console.log(this.props.ev.attendees);

		if(this.state.filter=="Yes"){
			return this.props.ev.attendees.filter(attendee => attendee.firsttime == true);
		}
		if(this.state.filter=="No"){
			return this.props.ev.attendees.filter(attendee => attendee.firsttime == false);
		}
		return this.props.ev.attendees;
	}

	changeFilter(){
		//this.state.filter = this.refs.filter.value;
		this.setState({filter: this.refs.filter.value});
	}

	changeSort(){
		//this.state.sort = this.refs.sort.value;
		this.setState({sort: this.refs.sort.value});
	}

	getEvent(){
		//console.log(Events.find({_id: this.props.eid}).fetch());
		//return Events.find({_id: this.props.eid}).fetch();
		return Events.findOne(this.props.eid);
	}

	render() {

	let ev = this.props.ev;
	console.log(ev);
	//this.state.ev= ev;
	/*
	if(!ev){
		return (<div>Loading...</div>);
	}*/
	document.title = (!ev) ? "Ivy - Event Detail - ": "Ivy - Event Detail - " + ev.name;
		return (

		<div className="panel panel-default">
			<div className="panel-heading">
				<h3 class="panel-title">{!ev ? "":ev.name}</h3>
			</div>
			<div className="panel-body">
				<p>Event Description: {!ev ? "": ev.description}</p>
				<h3>Attendees</h3>
				<label>Filter: <select ref="filter" onChange={this.changeFilter.bind(this)} value={this.state.filter}>
					<option value={"All"}>All</option>
					<option value={"Yes"}>Yes</option>
					<option value={"No"}>No</option>
				</select></label>
			<label>Sort: <select ref="sort" onChange={this.changeSort.bind(this)} value={this.state.sort}>
					<option value={"Name"}>Name</option>
					<option value={"First Time"}>First Time</option>
				{/*}	<option value={"Status"}>Status</option> */}
				</select></label>
			</div>
				<table className="table table-hover">
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Phone</th>
							<th>First Time?</th>
							{checkPermission("tickets") ?
							<th>Ticket</th>:"" }
						</tr>
					</thead>
					<tbody>
						{!ev ? "" : this.getAttendees().map( (contact)=>{
								return <Attendee key={contact._id} contact={contact} />
						})}
					</tbody>
				</table>
		</div>
		)
	}
}
