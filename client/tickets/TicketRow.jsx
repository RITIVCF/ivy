import React, {Component} from 'react';

// props:
//    tkt:  ticket
export default class TicketRow extends Component {
  getUser(){
    if(this.props.tkt.assigneduser==""){
      return {name:""};
    }

		let user = Meteor.users.findOne({_id:this.props.tkt.assigneduser});

		if ( user ) {
			return user;
		} else {
			return {name: ""};
		}
  }

  getGroup(){
    return Groups.findOne(this.props.tkt.assignedgroup);
  }

  getCust(){
    if(this.props.tkt.customer==""){
      return {name: ""};
    }
    console.log(this.props.tkt.customer);
		let user = Meteor.users.findOne({_id:this.props.tkt.customer});

		if ( user ) {
			return user;
		} else {
			return {name: ""};
		}

  }

  go(){
    FlowRouter.go("/tickets/"+ this.props.tkt._id);
    //this.props.parent.editTicket(this.props.tkt._id);
  }

  selectThis(event){
    event.stopPropagation();
    Session.set("ticselected", this.props.tkt._id);
    //this.props.select(this.props.tkt._id);
  }

  render() {
    var status="";
    let ticket = this.props.tkt;
    if(ticket.status == "Closed"){
      //status = "material-icons green-text";
      status = "ticket-closed";
      if(!ticket.assigneduser){
        status += " unassignedclosed";
      }
    }
    else if(ticket.status == "Pending"||ticket.status=="In Progress"){
      //status = "material-icons gold-text";
      status = "ticket-pending";
      if(!ticket.assigneduser){
        status += " unassignedpending";
      }
    }
    else {
      //status = "material-icons red-text";
      status = "ticket-open";
      if(!ticket.assigneduser){
        status += " unassignedopen";
      }
    }
    return (
      <tr className={this.props.selected?"blue white-text":""}
        onClick={this.selectThis.bind(this)} onDoubleClick={this.go.bind(this)}>
        <td className={status}></td>
        <td>{this.props.tkt.ticketnum}</td>
        <td>{this.props.tkt.subject}</td>
        <td>{this.getCust().name}</td>
        <td>{this.props.tkt.type}</td>
        <td>{this.props.tkt.ereqtype}</td>
        <td>{this.getUser().name}</td>
        <td>{this.props.tkt.assignedgroup?this.getGroup().name:""}</td>
        <td>{this.props.tkt.status}</td>
        <td>{new moment(this.props.tkt.lastUpdated).format("MM/DD/YY hh:mmA")}</td>
      </tr>
    )
  }
}
