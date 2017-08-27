import React, {Component} from 'react';

export default class JobSingle extends Component {
  getUser(){
    return  Meteor.users.findOne(this.props.job.uid);
  }

  delete(){
    Meteor.call("deleteJobRequest", this.props.ev._id, this.props.job);
  }

  render() {
    // This area needs styled, so however we need to do it to style
    // it correctly. Review Alex's mock ups and Jeanie's drawings.-->

    return (
        <li className="collection-item" id="showhim">
          <span className="title">{this.getUser().name}</span>
          <p style={{margin: "0px"}}>{this.props.job.job}
            {this.props.perm?
              <span onClick={this.delete.bind(this)} className="material-icons right" id="showme">call_received</span>:""}
            <br/>
            {this.props.job.status}
          </p>
      </li>

    )
  }
}
