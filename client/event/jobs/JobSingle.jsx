import React, {Component} from 'react';

export default class EventSingle extends Component {
  getUser(){
    //console.log(this);

    return Contacts.findOne({_id:
        Meteor.users.findOne({_id:this.props.job.uid}).contact}
      );
  }

  delete(){
    Meteor.call("deleteJobRequest", this.props.ev._id, this.props.job);
  }

  render() {
    // This area needs styled, so however we need to do it to style
    // it correctly. Review Alex's mock ups and Jeanie's drawings.-->

    return (
      <form onSubmit={this.delete.bind(this)} className="navbar-form">
        <div className="form-group">
          {this.props.perm?<button className="form-control">X</button>:""}
        <div>{this.props.job.status}</div>
        <div>{this.getUser().name}</div>
        <div>{this.props.job.job}</div>
      </div>
    </form>

    )
  }
}
