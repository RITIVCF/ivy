import React, {Component} from 'react';

export default class RequestSingle extends Component {
  getUser(){
    if(this.props.request.assigneduser==""){
      return {name:"-"};
    }
    return Meteor.users.findOne({_id:this.props.request.assigneduser});
  }

  go(){
    if(checkPermission("tickets")){
      FlowRouter.go("/tickets/"+this.props.request._id);
    }
  }

  render() {
    return (
      <tr onDoubleClick={this.go.bind(this)}>
        <td>{new moment(this.props.request.lastUpdated).format("MM/DD/YY hh:mmA")}</td>
        <td>{this.props.request.status}</td>
        <td>{this.props.request.subject}</td>
        <td>{this.getUser().name}</td>
        <td>{new moment(this.props.request.createdAt).format("MM/DD/YY hh:mmA")}</td>
      </tr>
    )
  }
}
