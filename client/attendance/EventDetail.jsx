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

	componentDidMount(){
		$('.tooltipped').tooltip({delay: 50});
	}

	export(){
		var csvContent = "data:text/csv;charset=utf-8,";
		csvContent += "Event Name:,"+this.props.ev.name+"\n";
		csvContent += "Name, Email, Phone, First Time?, Learn More?, How did you hear about us?, Newsletter, Status\n";
		 this.getAttendees().forEach(function(contact){
			 //console.log(contact);
			 var dataString = "";
			 dataString += contact.name + "," + contact.email + "," + contact.phone  + ",";
			 dataString += contact.firsttime ? "Yes":"No";
			 dataString += ",";
			 dataString += contact.more ? "Yes":"No";
			 dataString += ",";
			 dataString += contact.howhear ? contact.howhear:"";
			 dataString += ",";
			 dataString += contact.newsletter ? "Yes":"No";
			 dataString += ",";
			 dataString += contact.member ? "Member":"Contact";
			 dataString += "\n";
			 csvContent += dataString;
		 });
		 var encodedUri = encodeURI(csvContent);
		 var link = document.createElement("a");
		 link.setAttribute("href", encodedUri);
		 link.setAttribute("download", this.props.ev.name + " Attendance.csv");
		 document.body.appendChild(link); // Required for FF

		 link.click(); // This will download the data file named "my_data.csv".
	}



	getAttendees(){
		//var attendees = this.state.ev.attendees.filter(attendee =>
			//attendee[this.state.filter])
			//if(this.state.sort=="Name"){
				this.props.ev.attendees.sort(function(a, b) {
					console.log("a",a);
					console.log("b", b);
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

		//console.log(this.props.ev.attendees);

		if(this.state.filter=="Yes"){
			return this.props.ev.attendees.filter(attendee => attendee.firsttime == true);
		}
		if(this.state.filter=="No"){
			return this.props.ev.attendees.filter(attendee => attendee.firsttime == false);
		}
		return this.props.ev.attendees;
	}

	getCountNew(){
		var count = 0;
		for(i=0;i<this.props.ev.attendees.length;i++){
			//console.log(this.props.ev.attendees[i]);
			if(this.props.ev.attendees[i].firsttime){
				count += 1;
			}
		}
		return count;
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
	//console.log(ev);
	//this.state.ev= ev;
	/*
	if(!ev){
		return (<div>Loading...</div>);
	}*/
	document.title = (!ev) ? "Ivy - Event Detail - ": "Ivy - Event Detail - " + ev.name;
		return (

		<div className="card">
			<div className="card-image">
				<img src="/images/defaultEventSmall.png" />
				<span className="card-title">{!ev ? "":ev.name}</span>
			</div>
			<div className="card-content">
				<p>Event Description: <br/>{!ev ? "": ev.description}</p>
				<p><b>Event Start:</b> {!!ev ? moment(ev.start.toISOString()).format("DD MMM @ h:mmA"):""}</p>
				<p><b>Event End:</b> {!!ev ? moment(ev.end.toISOString()).format("DD MMM @ h:mmA"):""}</p>
				<hr/>
				<h4>Attendees
					<a onClick={this.export.bind(this)} className="btn tooltipped right" data-position="bottom"
						data-delay="50" data-tooltip="Export Attendance">
						<i className="material-icons">play_for_work</i></a>
				</h4>
				<div className="row">
					<div className="col s12 m5">
						<label>First time: <select ref="filter" className="browser-default" onChange={this.changeFilter.bind(this)} value={this.state.filter}>
								<option value={"All"}>All</option>
								<option value={"Yes"}>Yes</option>
								<option value={"No"}>No</option>
							</select></label>
						<label>Sort: <select ref="sort" className="browser-default" onChange={this.changeSort.bind(this)} value={this.state.sort}>
								<option value={"Name"}>Name</option>
								<option value={"First Time"}>First Time</option>
							{/*}	<option value={"Status"}>Status</option> */}
							</select></label>
					</div>
					<div className="col s4 m4">

					</div>
					<div className="col s8 m3">
						<table style={{outline: "solid 2px"}}>
							<thead>
								<tr>
									<th colspan="2">Attendees</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Total:</td>
									<td>{ev.attendees.length}</td>
								</tr>
								<tr>
									<td>New:</td>
									<td>{this.getCountNew()}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>


			</div>
				<table className={checkPermission("contacts")?"highlight":""}>
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Phone</th>
							<th>First Time?</th>
							<th>Learn More?</th>
							<th>How hear about us?</th>
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
