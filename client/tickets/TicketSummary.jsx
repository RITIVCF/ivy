import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import TicketRow from './TicketRow.jsx';
import NewTicketWindow from './NewTicketWindow.jsx';
import EditTicketWindow from './EditTicketWindow.jsx';


export default class TicketsSummary extends TrackerReact(React.Component) {
  constructor() {
    super();

    this.state = {
      subscription: {
        Tickets: Meteor.subscribe("allActiveTickets"),
        options: Meteor.subscribe("allOptions"),
        events: Meteor.subscribe("allEvents"),
        users: Meteor.subscribe("allUsers"),
        contacts: Meteor.subscribe("allContacts")
      },
      filter: "assigneduser",
      ticketId: false
    };

    if(!Session.get("ticketfilter")){
      Session.set("ticketfilter", "assigneduser");
    }
  }

  componentWillUnmount() {
    this.state.subscription.Tickets.stop();
    this.state.subscription.users.stop();
    this.state.subscription.contacts.stop();
    this.state.subscription.options.stop();
    this.state.subscription.events.stop();
  }

  newTicket(event){
		event.preventDefault();
  	this.refs.newticketoverlay.openOverlay();
  }

  filterChange(event){
    event.preventDefault();
    //this.setState({filter: this.refs.filter.value});
    Session.set("ticketfilter",this.refs.filter.value);
  }

  editTicket(tid){
		event.preventDefault();
    //this.state.ticketId = tid;
  	this.refs.editticketoverlay.openOverlay(tid);
  }



  tickets(filter){
    // pulls upcoming, published events
    if(filter==""){
      return Tickets.find().fetch();
    }
    if(filter=="assigneduser"){
      return Tickets.find({assigneduser:Meteor.userId()});
    }
    if(filter=="assignedgroup"){
      var grps = Groups.find({users: Meteor.userId()}).fetch();
      var ids = [];
      grps.forEach(function(group){
        ids.push(group._id);
      });
      //console.log("GGroups:");
      //console.log(ids);
      return Tickets.find({"assignedgroup": {$in: ids}});
    }
    return Tickets.find().fetch();
  }


	render() {
    document.title="Ivy - Ticket Dashboard";
    if(!checkPermission("tickets")){
			return <div>Sorry. It looks like you don't have permission to view this page. Please check with your leadership team to get access.</div>
		}
    var ticket = Tickets.findOne(this.state.ticketId);
		return (
      <div>
        {(this.state.subscription.users.ready()&&this.state.subscription.contacts.ready()) ?
        <NewTicketWindow ref="newticketoverlay" parent={this} /> : ""}
          {(this.state.subscription.users.ready()&&this.state.subscription.contacts.ready()) ?
          <EditTicketWindow ref="editticketoverlay" parent={this} ticket={ticket} /> : ""}
        <div className="row">
          <div className="col-sm-3 col-lg-2">
            <nav className="navbar navbar-default navbar-fixed-side">
              <div className="col-sm-12">
                <div className="btn-group btn-group-justified" role="group" aria-label="...">
                  <div className="btn-group" role="group">
                    {(this.state.subscription.users.ready()&&this.state.subscription.contacts.ready()) ?
                    <button className="btn btn-primary" onClick={this.newTicket.bind(this)}>New</button>
                      : <button className="btn btn-primary" >New</button>}
                  </div>
                </div>
              </div>

            </nav>
          </div>
          <div className="col-sm-9 col-lg-10">
            <h1>Ticket Dashboard</h1>
            <div className="panel panel-default">

              <div className="panel-body">
                <select ref="filter" value={Session.get("ticketfilter")} onChange={this.filterChange.bind(this)}>
                  <option value={"assigneduser"}>My Active Tickets</option>
                  <option value={"assignedgroup"}>{"My Groups' Active Tickets"}</option>
                  <option value={""}>All Active Tickets</option>
                </select>
              </div>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Subject</th>
                  <th>Customer</th>
                  <th>Ticket Type</th>
                  <th>Request Type</th>
                  <th>Assigned User</th>
                  <th>Assigned Group</th>
                  <th>Status</th>
                  <th>Last Updated</th>
                </tr>
              </thead>
              {!(this.state.subscription.Tickets.ready()&&this.state.subscription.contacts.ready()&&this.state.subscription.users.ready()) ? <tbody></tbody>:
              <tbody>
                {this.tickets(Session.get("ticketfilter")).map( (ticket)=>{
                    return <TicketRow key={ticket._id} tkt={ticket} parent={this} />
                })}
              </tbody>}
            </table>
          </div>
        </div>
      </div>
    </div>
  )
	}
}
