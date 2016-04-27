import React, {Component} from 'react';

export default class RequestSingle extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.requests.lastupdated}</td>
        <td>{this.props.requests.status}</td>
        <td>{this.props.requests.description}</td>
        <td>{this.props.requests.createdAt}</td>
        <td>{this.props.requests.assignedTo}</td>
      </tr>
    )
  }
}
