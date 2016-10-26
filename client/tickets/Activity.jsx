import React, {Component} from 'react';

// props:
//    tkt:  ticket
export default class Activity extends Component {
  getUser(){
    //console.log(this);
    if(this.props.activity.user==""){
      return {name:""};
    }
    return Contacts.findOne({_id:
        Meteor.users.findOne({_id:this.props.activity.user}).contact}
      );
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
