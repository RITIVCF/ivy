import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import GroupWorkspace from './GroupWorkspace.jsx';

export default class EditGroupModal extends TrackerReact(React.Component) {
  constructor(){
    super();

  }

  delete(){
    Meteor.call("removeGroup",this.props.group._id, (error, result)=>{
			if(error){
				console.log(error);
				window.alert(error + "\n" + error.details);
			}
		});
		if(this.props.onClose){
			this.props.onClose();
		}
  }

  render() {
    let show = false;
    return (
			<Row>
				<a className="btn-flat" onClick={this.props.onClose}>Close</a>
				<a onClick={this.delete.bind(this)} className="btn red">Remove</a>
				<GroupWorkspace group={this.props.group} />
			</Row>
    )
  }
}
