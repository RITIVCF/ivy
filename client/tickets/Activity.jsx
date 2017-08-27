import React, {Component} from 'react';

export default class Activity extends Component {
  getUser(){
    if(this.props.activity.user==""){
      return {name:""};
    }

    return Meteor.users.findOne({_id:this.props.activity.user});
  }

  render() {
    return (
      <tr>
        <td>{this.props.activity.type}</td>
        <td>{this.props.activity.desc}</td>
        <td>{this.getUser().name}</td>
        <td>{new moment(this.props.activity.createdAt).format("MM/DD/YY hh:mmA")}</td>
      </tr>
    )
  }
}
