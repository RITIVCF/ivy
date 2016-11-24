import React, {Component} from 'react';

export default class Contact extends Component {

  render() {
    return (
      <option value={this.props.contact._id}>
        {this.props.contact.name} {this.props.contact.email} {new moment(this.props.contact.createdAt.toISOString()).format(" h:mm:sA Do MMM YY")}
      </option>
    )
  }
}
