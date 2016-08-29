import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SelectUser from '../sharedcomponents/SelectUser.jsx';
import TicketSubject from './components/TicketSubject.jsx';
import TicketDescription from './components/TicketDescription.jsx';
import Activity from './Activity.jsx';

export default class EditTicketForm extends TrackerReact(React.Component) {
  constructor(props) {
    super(props);
    this.state={
      assignedu: "",
      status: props.ticket.status

    }
  }

  getUser(id){
    if(!id){
      return '';
    }
    if(id=="Ivy System"){
      return "Ivy System";
    }
    console.log(id);
    console.log(Meteor.users.findOne(id).contact);
    console.log(Contacts.findOne(Meteor.users.findOne(id).contact).name);
    return Contacts.findOne(Meteor.users.findOne(id).contact).name;
  }

  getEventName(){
    return Events.findOne(this.props.ticket.eid).name;
  }

  getTypes(){
    return Options.findOne({_id: "tickettypes"}).vals;
  }
  getStatuses(){
    return Options.findOne({_id: "ticketstatuses"}).vals;
  }
  getReqTypes(){
    return Options.findOne({_id: "requesttypes"}).vals;
  }

  updateAssignedU(user){
    //this.state.assigned = user;
    console.log(user);
    Meteor.call("updateTicketAssignedUser", this.props.ticket._id, user._id);
  }

  assignToMe(){
    if(Meteor.userId()!=this.props.ticket.assigneduser){
      Meteor.call("updateTicketAssignedUser", this.props.ticket._id, Meteor.userId());
    }
  }


  updateStatus(){
    var update = true;
    if(this.refs.status.value=="Closed"||this.refs.status.value=="Canceled"){
      if(!window.confirm("Are you sure?")){
        update = false;
      }
    }
    if(update){
      this.state.status = this.refs.status.value;
      Meteor.call("updateTicketStatus",
      this.props.ticket._id, this.refs.status.value);
    }
    else{
      this.refs.status.value = this.state.status;
    }
  }

  addNote(){
    Meteor.call("addTicketNote", this.props.ticket._id, this.refs.notebox.value);
    this.refs.notebox.value="";
  }

  updateType(){
    Meteor.call("updateTicketType", this.props.ticket._id, this.refs.type.value);
  }

  updateReqType(){
    Meteor.call("updateTicketReqType", this.props.ticket._id, this.refs.reqtype.value);
  }

  updateCust(user){
    console.log(user);
    Meteor.call("updateTicketCustomer", this.props.ticket._id, user._id);
  }
  unset(){

  }


	render() {
		return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-3 col-lg-2">
            <nav className="navbar navbar-default navbar-fixed-side">
            </nav>
          </div>
          <div className="col-sm-9 col-lg-10">
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="row">
                  <div className="col-sm-6">
                    <p>Date created: {new moment(this.props.ticket.createdAt).format("MM/DD/YY hh:mmA")}</p>
                    <p>Submitted by: {this.getUser(this.props.ticket.submittedby)}</p>
                    <p>Ticket #: {this.props.ticket.ticketnum}</p>
                      {this.props.ticket.type == "Contact" ? <div></div> :
                      <label>User: <SelectUser parent={this}
                        id={"customer"}
                        unset={this.unset.bind(this)}
                        updateContact={this.updateCust.bind(this)}
                        initialValue={this.getUser(this.props.ticket.customer)}
                        ref="cust"  /> </label>}
                        <br />
                        <TicketSubject parent={this} ticket={this.props.ticket} />
                        <TicketDescription parent={this} ticket={this.props.ticket} />
                        <br />
                        <label>Type:
                          <select ref="type" value={this.props.ticket.type} onChange={this.updateType.bind(this)}>
                            {this.getTypes().map( (type) =>{
                              return <option key={type} value={type} >{type}</option>
                            })}
                          </select>
                        </label><br />
                        {this.props.ticket.type == "Event Request" ?
                        <label>Request Type:
                          <select ref="reqtype" value={this.props.ticket.ereqtype} onChange={this.updateReqType.bind(this)}>
                            <option value={""}></option>
                            {this.getReqTypes().map( (type) =>{
                              return <option key={type} value={type} >{type}</option>
                            })}
                          </select>
                        </label> :"" }
                        {/*Group select will go here*/}
                        <br />
                        <label>Assigned User:
                        <SelectUser parent={this}
                          id={"assigneduser"}
                          unset={this.unset.bind(this)}
                          initialValue={this.getUser(this.props.ticket.assigneduser)}
                          updateContact={this.updateAssignedU.bind(this)}
                          ref="assigneduser"  />
                      </label><button onClick={this.assignToMe.bind(this)}>Assign to Me</button>
                        <br />
                        <label>Status:
                          <select ref="status" value={this.state.status} onChange={this.updateStatus.bind(this)} >
                            {this.getStatuses().map( (type) =>{
                              return <option key={type} value={type} >{type}</option>
                            })}
                          </select>
                        </label>
                  </div>
                  <div className="col-sm-6">
                    <p>Last updated: {new moment(this.props.ticket.lastUpdated).format("MM/DD/YY hh:mmA")}</p>
                    {this.props.ticket.eid ? <p>Event: {this.getEventName()}</p>:""}
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Activity</th>
                          <th>Description</th>
                          <th>User</th>
                          <th>Date/Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.ticket.activities.map( (activity) =>{
                          return <Activity key={activity.createdAt} activity={activity} />
                        })}
                      </tbody>
                    </table>
                    <textarea ref="notebox" /><br/>
                    <button onClick={this.addNote.bind(this)} >Add Note</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
	}
}
