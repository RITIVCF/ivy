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
    if(Session.get("tickettypefilter")===undefined){
      var array = ["Contact","Event Request","Prayer","Other"];
      Session.set("tickettypefilter",array);
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

  filterTypeChange(event){
    Session.set("tickettypefilter",event.target.value);
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
    query.type = {$in: Session.get("tickettypefilter")};
    console.log(query);
    return Tickets.find(query, {sort: {ticketnum: 1}}).fetch();
  }

  getSelected(){
    return Tickets.findOne(this.state.selected);
  }

  select(id){
    this.setState({selected: id});
  }

  handleCheck(id){
    var array = Session.get("tickettypefilter");
    console.log(array);
    if(array.includes(id)){
        array.splice(array.indexOf(id), 1);
    }else{
        array.push(id);
    }
    Session.set("tickettypefilter", array);
    // var state = {};
    // state[id]=!this.state[id];
    // this.setState(state);
  }

  stopPropa(event){
    event.stopPropagation();
  }

  unselect(){
    Session.set("ticselected","");
  }




	render() {
    var types = Session.get("tickettypefilter");
    let isAdmin = Groups.find({_id:"admin",users: Meteor.userId()}).fetch().length==1;
    //console.log(this.props.sub);
		return (
      <div onClick={this.unselect.bind(this)}>
        <div className="card" onClick={this.stopPropa.bind(this)}>
          <div className="card-content">
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
            <div className="row">
              <div className="col s12">
                <p>Type Filter:
                <input type="checkbox" id="contacttype" checked={types.includes("Contact")} onChange={this.handleCheck.bind(this,"Contact")} />
                  <label htmlFor="contacttype">Contact</label>
                <input type="checkbox" id="requesttype" checked={types.includes("Event Request")} onChange={this.handleCheck.bind(this,"Event Request")} />
                  <label htmlFor="requesttype">Event Request</label>
                <input type="checkbox" id="prayertype"  checked={types.includes("Prayer")}  onChange={this.handleCheck.bind(this,"Prayer")} />
                  <label htmlFor="prayertype" >Prayer Request</label>
                {isAdmin&&<input type="checkbox" id="feedbacktype"   checked={types.includes("Feedback")}   onChange={this.handleCheck.bind(this,"Feedback")} />}
                  {isAdmin&&<label htmlFor="feedbacktype"  >Feedback</label>}
                <input type="checkbox" id="othertype"   checked={types.includes("Other")}   onChange={this.handleCheck.bind(this,"Other")} />
                  <label htmlFor="othertype"  >Other</label>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
            <table className="bordered highlight responsive-table">
              <thead>
                <tr>
                  <th></th>
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
