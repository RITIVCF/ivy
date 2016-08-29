import React, {Component} from 'react';

export default class ContactSingle extends Component {
  constructor(){
    super();
    this.state = {
      ran: false
    };
  }

  viewTicket(){
    this.state.ran = true;
    FlowRouter.go("/tickets/"+this.props.contact.ticket);
  }

  go(){
    if(this.state.ran){
      return;
    }
    FlowRouter.go("/contacts/"+this.props.contact._id);
  }
  render() {
    // This area needs styled, so however we need to do it to style
    // it correctly. Review Alex's mock ups and Jeanie's drawings.-->
    return (
      <tr onClick={this.go.bind(this)}>
        <td>{this.props.contact.name}</td>
        <td>{this.props.contact.email}</td>
        <td>{this.props.contact.phone}</td>
        <td>{this.props.contact.newsletter ? "Yes":"No"}</td>
        <td>{this.props.contact.member ? "Member":"Contact"}</td>
        {this.props.perm?<td><button className="btn btn-primary" onClick={this.viewTicket.bind(this)}>View Ticket</button></td>:""}
      </tr>

    )
  }
}
