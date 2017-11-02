import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Attendee from './Attendee.jsx';
import Contact from '/lib/classes/Contact.js';


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
		csvContent += "Event Name:,"+this.props.event.name+"\n";
		csvContent += "Name, Email, Phone, First Time?, Learn More?, How did you hear about us?, Newsletter, Status\n";
		 this.getAttendees().forEach(function(contact){
			 var dataString = "";
			 dataString += contact.name + "," + contact.emails[0].address + "," + contact.phone  + ",";
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
		 link.setAttribute("download", this.props.event.name + " Attendance.csv");
		 document.body.appendChild(link); // Required for FF

		 link.click(); // This will download the data file named "my_data.csv".
	}



	getAttendees(){
		let attendees = [];
		this.props.event.attendees.forEach((attendee)=>{
			contact = new Contact(Meteor.users.findOne(attendee._id));
			for(var key in attendee){
				contact[key] = attendee[key];
			}
			attendees.push(contact);
		});

		attendees.sort(function(a, b) {
		  var nameA = a.getName().toUpperCase(); // ignore upper and lowercase
		  var nameB = b.getName().toUpperCase(); // ignore upper and lowercase
		  if (nameA < nameB) {
		    return -1;
		  }
		  if (nameA > nameB) {
		    return 1;
		  }

		  // names must be equal
		  return 0;
		});
		if(this.state.sort=="First Time"){
			attendees.sort(function(x, y) {
					return y.firsttime-x.firsttime;
			});
		}

		if(this.state.filter=="Yes"){
			return attendees.filter(attendee => attendee.firsttime == true);
		}
		if(this.state.filter=="No"){
			return attendees.filter(attendee => attendee.firsttime == false);
		}
		return attendees;
	}

	getCountNew(){
		var count = 0;
		for(i=0;i < this.props.event.attendees.length;i++){

			if(this.props.event.attendees[i].firsttime){
				count += 1;
			}

		}

		return count;
	}

	changeFilter(){
		this.setState({filter: this.refs.filter.value});
	}

	changeSort(){
		this.setState({sort: this.refs.sort.value});
	}

	getEvent(){
		return Events.findOne(this.props.eid);
	}

	render() {
		const ev = this.props.event;

		const showTicketColumn = checkPermission("tickets");

		const title = (!ev) ? "Event Detail - ": "Event Detail - " + ev.name;
		setDocumentTitle(title);
		const imgPath = ev.pic?ev.pic:"/images/defaultEventSmall.png";


		return (
			<Row>
				<Column>
					<div className="card">
						<div className="eventImage" style={{backgroundImage: `url(${imgPath})`}}>
							<span className="card-title">{!!ev && ev.name}</span>
						</div>
						<div className="card-content">
							<p>Event Description: <br/>{!!ev && ev.description}</p>
							<p><b>Event Start:</b> {!!ev && moment(ev.start.toISOString()).format("DD MMM @ h:mmA")}</p>
							<p><b>Event End:</b> {!!ev && moment(ev.end.toISOString()).format("DD MMM @ h:mmA")}</p>
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
									</select></label>
								</div>
								<div className="col s4 m4">

								</div>
								<div className="col s8 m3">
									<table style={{outline: "solid 2px"}}>
										<thead>
											<tr>
												<th colSpan="2"><span style={{textAlign:"center"}}>Attendees</span></th>
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
						<table className={checkPermission("contacts")?"highlight responsive-table":"responsive-table"}>
							<thead>
								<tr>
									<th></th>
									<th>Name</th>
									<th>Email</th>
									<th>Phone</th>
									<th>First Time?</th>
									<th>Learn More?</th>
									<th>How hear about us?</th>
									{showTicketColumn && <th>Ticket</th>}
								</tr>
							</thead>
							<tbody>
								{this.getAttendees().map( (contact)=>{
									return <Attendee key={contact._id} contact={contact} showTicketColumn={showTicketColumn} />
								})}
							</tbody>
						</table>
					</div>
				</Column>
			</Row>
		)
	}
}
