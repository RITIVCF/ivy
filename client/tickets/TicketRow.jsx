import React, {Component} from 'react';

// props:
//    tkt:  ticket
export default class TicketRow extends Component {
  getUser(){
    console.log(this);
    if(this.props.tkt.assigneduser==""){
      return {name:""};
    }
    return Contacts.findOne({_id:
        Meteor.users.findOne({_id:this.props.tkt.assigneduser}).contact}
      );
  }

  getCust(){
    if(this.props.tkt.customer==""){
      return {name: ""};
    }
    if(this.props.tkt.type == "Contact"){
      return {name: ""};//Contacts.findOne(this.props.tkt.customer).name;
    }
    return Contacts.findOne({_id:
        Meteor.users.findOne({_id:this.props.tkt.customer}).contact
      });
  }

  go(){
    FlowRouter.go("/tickets/"+ this.props.tkt._id);
    //this.props.parent.editTicket(this.props.tkt._id);
  }

  render() {
    return (
      <tr onClick={this.go.bind(this)}>
        <td>{this.props.tkt.ticketnum}</td>
        <td>{this.props.tkt.subject}</td>
        <td>{this.getCust().name}</td>
        <td>{this.props.tkt.type}</td>
        <td>{this.props.tkt.ereqtype}</td>
        <td>{this.getUser().name}</td>
        <td></td>
        <td>{this.props.tkt.status}</td>
        <td>{new moment(this.props.tkt.lastUpdated).format("MM/DD/YY hh:mmA")}</td>
      </tr>
    )
  }
}
