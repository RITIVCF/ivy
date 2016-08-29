import React, {Component} from 'react';

export default class Group extends Component {


  delete(){
    Meteor.call("removeGroupFromPage", this.props.page._id, this.props.group._id);
  }

  render() {
    return (
      <tr>
        <td>
        {this.props.group.name=="Administrator" ?
          "" :<button onClick={this.delete.bind(this)}>X</button>}
          </td>
        <td>{this.props.group.name}</td>
      </tr>
    )
  }
}
