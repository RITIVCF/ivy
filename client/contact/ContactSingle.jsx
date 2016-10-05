import React, {Component} from 'react';

export default class ContactSingle extends Component {
  constructor(){
    super();
    this.state = {
      ran: false,
      opened: false
    };
  }

  viewTicket(){
    this.state.ran = true;
    FlowRouter.go("/tickets/"+this.props.contact.ticket);
  }

  changeStatus(){
    Meteor.call("updateStatus", this.props.contact, this.refs.status.value);
    this.state.opened = false;
  }

  openDropdown(){
    this.state.opened = true;
  }

  closeDropdown(){
    this.state.opened = false;
  }

  go(){
    if(this.state.ran||this.state.opened){
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
        {/*<td>{this.props.contact.status //this.props.contact.member ? "Member":"Contact"}</td> */}
        {checkPermission("admin") ? <td><select
            ref="status"
            value={this.props.contact.status}
            onClick={this.openDropdown.bind(this)}
            onBlur={this.closeDropdown.bind(this)}
            onChange={this.changeStatus.bind(this)} >
          <option value="Crowd">Crowd</option>
          <option value="Visitor">Visitor</option>
          <option value="Member">Member</option>
          <option value="Server">Server</option>
          <option value="Leader">Leader</option>
          <option value="Multiplier">Multiplier</option>
        </select></td> : <td>{this.props.contact.status}</td>}
        {this.props.perm?<td><button className="btn btn-primary" onClick={this.viewTicket.bind(this)}>View Ticket</button></td>:""}
      </tr>

    )
  }
}
