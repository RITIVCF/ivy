import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SelectUser from '../sharedcomponents/SelectUser.jsx';
import SelectTeam from '../sharedcomponents/SelectTeam.jsx';
import TicketSubject from './components/TicketSubject.jsx';
import TicketDescription from './components/TicketDescription.jsx';
import Activity from './Activity.jsx';

export default class EditTicketForm extends TrackerReact(React.Component) {
  constructor(props) {
    super(props);
    this.state={
      assignedu: "",
      status: props.ticket.status,
      notedisable: true
    }
  }

  componentDidMount(){
    Materialize.updateTextFields();
    $('select').material_select();
  }

  getUser(id){
    if(!id){
      return '';
    }
    if(id=="Ivy System"){
      return "Ivy System";
    }
    //console.log(id);
    //console.log(Meteor.users.findOne(id).contact);
    //console.log(Contacts.findOne(Meteor.users.findOne(id).contact).name);
    //return Contacts.findOne(Meteor.users.findOne(id).contact).name;
    return Meteor.users.findOne(id).name;
  }

  getGroup(id){
    if(!id){
      return '';
    }
    return Groups.findOne(this.props.ticket.assignedgroup).name;
  }

  getEventName(){
    return Events.findOne(this.props.ticket.eid).name;
  }

  goToEvent(){
    if(checkPermission('attendance')){
      FlowRouter.go("/attendance/event/"+this.props.ticket.eid);
    }
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
    //console.log(user);
    Meteor.call("updateTicketAssignedUser", this.props.ticket._id, user._id);
  }

  assignToMe(){
    if(Meteor.userId()!=this.props.ticket.assigneduser){
      Meteor.call("updateTicketAssignedUser", this.props.ticket._id, Meteor.userId());
    }
  }

  updateAssignedG(group){
    //this.state.assigned = user;
    //console.log(group);
    Meteor.call("updateTicketAssignedGroup", this.props.ticket._id, group._id);
  }

  assignToMyGroup(){

    //Finish this function. For now, disable "Assign to My Group" control
    // if(Meteor.userId()!=this.props.ticket.assigneduser){
    //   Meteor.call("updateTicketAssignedUser", this.props.ticket._id, Meteor.userId());
    // }
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

  noteChangeHandle(event){
    if(event.target.value==""){
      this.setState({notedisable: true});
    }
    else{
      this.setState({notedisable: false});
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
    //console.log(user);
    Meteor.call("updateTicketCustomer", this.props.ticket._id, user._id);
  }
  unset(){

  }


	render() {
    var activities = this.props.ticket.activities.reverse();
		return (
      <div className="row">
        <div className="col s12">
        <div className="card">
          <div className="card-content">
            <div className="row">
              <div className="col s12 m6">
                <div className="col s4">
                  <p>Date created:</p>
                </div>
                <div className="col s8">
                  <p>{new moment(this.props.ticket.createdAt).format("MM/DD/YY hh:mmA")}</p>
                </div>
                <div className="col s4">
                  <p>Submitted by:</p>
                </div>
                <div className="col s8">
                  <p>{this.getUser(this.props.ticket.submittedby)}</p>
                </div>
                <div className="col s4">
                  <p>Ticket #: </p>
                </div>
                <div className="col s8">
                  <p>{this.props.ticket.ticketnum}</p>
                </div>
                <div className="row">
                  <div className="col s12">
                  {this.props.ticket.type != "Contact"&&
                  <SelectUser parent={this}
                    id={"customer"}
                    label="Ticket for"
                    unset={this.unset.bind(this)}
                    updateContact={this.updateCust.bind(this)}
                    initialValue={this.getUser(this.props.ticket.customer)}
                    ref="cust"  />}

                    <TicketSubject parent={this} ticket={this.props.ticket} />
                    <TicketDescription parent={this} ticket={this.props.ticket} />
                    <div className="">
                    <label>Type:</label>
                      <select ref="type" className="browser-default"
                        value={this.props.ticket.type}
                        onChange={this.updateType.bind(this)}>
                        {this.getTypes().map( (type) =>{
                          return <option key={type} value={type} >{type}</option>
                        })}
                      </select>
                    </div>
                    {this.props.ticket.type == "Event Request" && <div>
                    <label>Request Type:</label>
                      <select ref="reqtype"
                        className="browser-default"
                        value={this.props.ticket.ereqtype}
                        onChange={this.updateReqType.bind(this)}>
                        {this.getReqTypes().map( (type) =>{
                          return <option key={type.label} value={type.label} >{type.label}</option>
                        })}
                      </select>
                    </div>}

                     <SelectTeam
               				parent={this}
               				id={"assignedgroup"}
               				unset={this.unset.bind(this)}
               				updateContact={this.updateAssignedG.bind(this)}
               				initialValue={this.getGroup(this.props.ticket.assignedgroup)}
               				ref={"assignedgroup"}
               				/>
                    <SelectUser parent={this}
                      id={"assigneduser"}
                      label="Assigned User"
                      unset={this.unset.bind(this)}
                      initialValue={this.getUser(this.props.ticket.assigneduser)}
                      updateUser={this.updateAssignedU.bind(this)}
                      ref="assigneduser" aria-describedby="assignme"/>
                    {/*}<button className="btn btn-info" onClick={this.assignToMe.bind(this)}>Assign to Me</button>*/}
                    <label>Status:</label>
                    <select className="browser-default"
                      ref="status" value={this.state.status} onChange={this.updateStatus.bind(this)} >
                      {this.getStatuses().map( (type) =>{
                        return <option key={type} value={type} >{type}</option>
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col s12 m6">
                <div className="col s4">
                  <p>Last updated: </p>
                </div>
                <div className="col s8">
                  <p>{new moment(this.props.ticket.lastUpdated).format("MM/DD/YY hh:mmA")}</p>
                </div>
                {
                  !this.props.ticket.eid?"":
                  <div className="row">
                    <div className="col s4">
                      <p>Event:</p>
                    </div>
                    <div className="col s8">
                      {!checkPermission('attendance')?<p>{this.getEventName()}</p>:
                      <a href={"/attendance/event/"+this.props.ticket.eid}>{this.getEventName()}</a>}
                    </div>
                  </div>
                }
                <div style={{height: "400px",overflowY:"scroll", border: "solid darkgrey 2px", marginBottom: "1em"}}>
                  <table className="striped">
                    <thead>
                      <tr>
                        <th>Activity</th>
                        <th>Description</th>
                        <th>User</th>
                        <th>Date/Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activities.map( (activity) =>{
                        return <Activity key={activity.createdAt} activity={activity} />
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="form-group">
                  <textarea ref="notebox"
                    className="browser-default"
                    rows="3"
                    onChange={this.noteChangeHandle.bind(this)}
                    placeholder="Add note here...." />
                </div>
                <a className="waves-effect waves-light btn" disabled={this.state.notedisable} onClick={this.addNote.bind(this)} >Add Note</a>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
  )
	}
}
