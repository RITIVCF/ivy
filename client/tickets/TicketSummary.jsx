import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import TicketRow from './TicketRow.jsx';
import NewTicketWindow from './NewTicketWindow.jsx';
import EditTicketWindow from './EditTicketWindow.jsx';


export default class TicketsSummary extends TrackerReact(React.Component) {
  constructor() {
    super();

    if(!Session.get("ticketfilter")){
      Session.set("ticketfilter", "assigneduser");
    }
  }

  newTicket(event){
		event.preventDefault();
  	$("#newticketmodal").modal("open");
  }

  filterChange(event){
    event.preventDefault();
    console.log(event.target.value);
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
    console.log(this.props.sub);
		return (
        <div className="card">
          <div className="card-content">
            <div className="col s12 m7 l7">
              <h1>Tickets Dashboard</h1>
            </div>
            <div className="input-field col s12 m5 l5">
              <a onClick={this.newTicket.bind(this)}
                className="waves-effect waves-light btn">New Ticket</a>
            </div>
            <select ref="filter" className="browser-default" value={Session.get("ticketfilter")} onChange={this.filterChange.bind(this)}>
                <option value={"assigneduser"}>My Active Tickets</option>
                <option value={"assignedgroup"}>{"My Groups' Active Tickets"}</option>
                <option value={""}>All Active Tickets</option>
              </select>

            <div className="divider"></div><br/>
              <table className="bordered striped highlight responsive-table">
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
                {!this.props.sub ? <tbody></tbody>:
                <tbody>
                  {this.tickets(Session.get("ticketfilter")).map( (ticket)=>{
                      return <TicketRow key={ticket._id} tkt={ticket} parent={this} />
                  })}
                </tbody>}
              </table>

            </div>
            {(this.props.sub) ?
            <NewTicketWindow ref="newticketoverlay" parent={this} /> : ""// Make this into a modal
            }
          </div>
  )
	}
}
