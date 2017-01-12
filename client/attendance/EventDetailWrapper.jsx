import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import EventDetail from './EventDetail.jsx';
import EventSingle from './EventSingle.jsx';


//Events = new Mongo.Collection("events");

export default class EventDetailWrapper extends TrackerReact(React.Component) {
	constructor() {
    super();

    this.state = {
      subscription:{
        Events: Meteor.subscribe("pastEvents", 0),
				Tickets: Meteor.subscribe("allTicketStatus"),
				Contacts: Meteor.subscribe("allContacts")
      }
    };
  }

  componentWillUnmount() {
    this.state.subscription.Events.stop();
		this.state.subscription.Tickets.stop();
		this.state.subscription.Contacts.stop();
  }

	getEvent(){
		//console.log(Events.find({_id: this.props.eid}).fetch());
		//return Events.find({_id: this.props.eid}).fetch();
		var ev = Events.findOne(this.props.eid);
		var attendees = [];
		var contact;
		ev.attendees.map( (attendee)=>{
			contact = Meteor.users.findOne(attendee._id);
				attendee[name] = contact[name];
				attendee[email] = contact[email];
				attendee[phone] = contact[phone];
				attendee[firsttime] = contact[firsttime];
				attendee[more] = contact[more];
				attendee[howhear] = contact[howhear];
				attendee[firsttime] = contact[firsttime];
				console.log(attendee);
		});
		return ev;
	}

	events(){
    // pulls past, published events
    return Events.find().fetch();
  }

	render() {
		if(!checkPermission("attendance")){
			return <div>Sorry. It looks like you don't have permission to view this page. Please check with your leadership team to get access.</div>
		}
		var ev;
		if(this.state.subscription.Events.ready()&&this.state.subscription.Contacts.ready()&&this.state.subscription.Tickets.ready()){
			ev = this.getEvent();
		}
	//console.log(ev);

	if(!ev){
		return (<div>Loading...</div>);
	}
	document.title = (!ev) ? "Ivy - Event Detail - ": "Ivy - Event Detail - " + ev.name;
		return (

		<div className="container-fluid">
			<div className="row">
				<div className="col-sm-3 col-lg-2">
					<nav className="navbar navbar-default navbar-fixed-side">
						{this.state.subscription.Events.ready() ? this.events().map( (ivevent)=>{
	              return <EventSingle key={ivevent._id} sidebar={true} ivevent={ivevent} parent={this}/>
	          }):""}
						{Events.find().fetch().length >= this.state.num ?
	          <button onClick={this.loadMore.bind(this)}>Load More</button>
	          :<div></div>}
					</nav>
				</div>
				<div className="col-sm-9 col-lg-10">
					<div className="panel panel-default">
						<div className="panel-heading">
							<h2 className="panel-title">Event Detail</h2>
						</div>
						<div className="panel-body">
							<EventDetail ev={ev} />
						</div>
					</div>
				</div>
			</div>
		</div>
		)
	}
}
