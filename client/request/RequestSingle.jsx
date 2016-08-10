import React, {Component} from 'react';

export default class RequestSingle extends Component {
  getUser(){
    console.log(this);
    if(this.props.request.assigneduser==""){
      return {name:"-"};
    }
    return Contacts.findOne({_id:
        Meteor.users.findOne({_id:this.props.request.assigneduser}).contact}
      );
  }

  render() {
    return (
      <tr>
        <td>{new moment(this.props.request.lastUpdated).format("MM/DD/YY hh:mmA")}</td>
        <td>{this.props.request.status}</td>
        <td>{this.props.request.subject}</td>
        <td>{this.getUser().name}</td>
        <td>{new moment(this.props.request.createdAt).format("MM/DD/YY hh:mmA")}</td>
      </tr>
    )
  }
}
