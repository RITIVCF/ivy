import React, {Component} from 'react';

export default class Attendee extends Component {

  getUser(){
    return Meteor.users.findOne(this.props.user._id);
  }

  render() {
    console.log(this.props.user);
    // This area needs styled, so however we need to do it to style
    // it correctly. Review Alex's mock ups and Jeanie's drawings.-->
    user = this.getUser();

    return (
      <tr>
        <td>{user.profile.name}</td>
        <td>{this.props.user.firsttime?"Yes":"No"}</td>
        <td>{this.props.user.firsttime ? "Link to ticket":""}</td>
      </tr>
    )
  }
}
