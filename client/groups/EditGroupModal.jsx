import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import GroupWorkspace from './GroupWorkspace.jsx';

export default class EditGroupModal extends TrackerReact(React.Component) {
  constructor(){
    super();

  }

  delete(){
    Meteor.call("removeGroup",this.props.group._id);
  }

  open(){
    $("#editgroupmodal"+this.props.group._id).appendTo("body").modal("open");
  }

  render() {
    let show = false;
    return (
      <div id={"editgroupmodal"+this.props.group._id} className="modal modal-fixed-footer">
        <div className="modal-content">
          <GroupWorkspace group={this.props.group} />
        </div>
        <div className="modal-footer">{/*buttons top to bottom go right to left */}
          <a className="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
          {show&&<a onClick={this.delete.bind(this)} className="modal-action modal-close waves-effect waves-green btn red">Remove</a>}
        </div>
      </div>
    )
  }
}
