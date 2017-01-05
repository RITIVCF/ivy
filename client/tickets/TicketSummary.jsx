import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import TicketRow from './TicketRow.jsx';
import NewTicketWindow from './NewTicketWindow.jsx';
import EditTicketWindow from './EditTicketWindow.jsx';


export default class TicketsSummary extends TrackerReact(React.Component) {
  constructor() {
    super();

    if(Session.get("ticketfilter")===undefined){
      Session.set("ticketfilter", "assigneduser");
    }
    if(!Session.get("tickettextfilter")){
      Session.set("tickettextfilter", "subject");
    }
    this.state = {
      selected: "",
      textfilter:""
    };
  }

  newTicket(event){
		event.preventDefault();
  	$("#newticketmodal").modal("open");
  }

  filterChange(event){
    event.preventDefault();
    event.stopPropagation();
    console.log(event.target.value);
    //this.setState({filter: this.refs.filter.value});
    Session.set("ticketfilter",event.target.value);
  }

  changeTextFilter(event){
    this.setState({textfilter: event.target.value});
  }

  textFilterChange(event){
    Session.set("tickettextfilter", event.target.value);
  }

  editTicket(tid){
		event.preventDefault();
    //this.state.ticketId = tid;
  	this.refs.editticketoverlay.openOverlay(tid);
  }



  tickets(filter){
    // pulls upcoming, published events
    var query ={};
    if(filter==""){
      //return Tickets.find().fetch();
    }
    if(filter=="assigneduser"){
      query.assigneduser = Meteor.userId();
      //return Tickets.find({assigneduser:Meteor.userId()});
    }
    if(filter=="assignedgroup"){
      var grps = Groups.find({users: Meteor.userId()}).fetch();
      var ids = [];
      grps.forEach(function(group){
        ids.push(group._id);
      });
      console.log("GGroups:");
      console.log(ids);
      query.assignedgroup = {$in: ids};
      //return Tickets.find({"assignedgroup": {$in: ids}});
    }
    if(this.state.textfilter!=""){

      query[Session.get("tickettextfilter")]
        = {$regex:this.state.textfilter, $options : 'i'};
      // when doing variable text filtering use:
      //   filter[field] = textfilter
    }
    console.log(query);
    return Tickets.find(query).fetch();
  }

  getSelected(){
    return Tickets.findOne(this.state.selected);
  }

  select(id){
    this.setState({selected: id});
  }

  stopPropa(event){
    event.stopPropagation();
  }

  unselect(){
    Session.set("ticselected","");
  }




	render() {
    //console.log(this.props.sub);
		return (
      <div className="row" onClick={this.unselect.bind(this)}>
          <div className="col s12">
            <div className="row">
                <a onClick={this.newTicket.bind(this)}
                  className="waves-effect waves-light btn right">New Ticket</a>
            </div>
            <div className="row">
              <div className="input-field col s12 m6">
                <select ref="filter" className="browser-default" value={Session.get("ticketfilter")}
                  onChange={this.filterChange.bind(this)}>
                    <option value={"assigneduser"}>My Active Tickets</option>
                    <option value={"assignedgroup"}>{"My Groups' Active Tickets"}</option>
                    <option value={""}>All Active Tickets</option>
                  </select>
              </div>
              <div className="input-field col s4 m2">
                <select ref="textfilter" className="browser-default" value={Session.get("tickettextfilter")}
                  onChange={this.textFilterChange.bind(this)}>
                    <option value={"subject"}>Subject</option>
                    {/*}<option value={"assigneduser"}>Assigned User</option>
                    <option value={"assignedgroup"}>Assigned Group</option>
                    /* FINISH THIS AREA HERE YOU ARE ADDING TYPES, then you need to
                    check the functions to mke sure the session variable is set
                    correctly.  AM I MAYBE CHANGING OUT THE INPUT TYPE TO select
                    FOR SOME OF THESE CHOICES?  I WOULD LIKE TO*/}
                  </select>
              </div>
              <div className="input-field col s8 m4">
                <input ref="filter" onChange={this.changeTextFilter.bind(this)} type="text" className="validate" />
                <label htmlFor="icon_prefix">Search</label>
              </div>
            </div>


            <div className="divider"></div><br/>
              <table className="bordered highlight responsive-table">
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
                      return <TicketRow key={ticket._id} tkt={ticket}
                        selected={Session.get("ticselected")==ticket._id}
                        select={this.select.bind(this)} parent={this} />
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
