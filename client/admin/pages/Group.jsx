import React, {Component} from 'react';

export default class Group extends Component {


  delete(){
    Meteor.call("removeGroupFromPage", this.props.page._id, this.props.group._id);
  }

  render() {
    return (
      <tr id="hover-me">
        <td>{this.props.group.name}
          {this.props.group.name=="Administrator" ?
            ""
            :<button
              style={{float: "right"}}
              id="hover-content"
              className="btn btn-danger"
              onClick={this.delete.bind(this)}>Remove</button>
          }
        </td>
      </tr>
    )
  }
}
