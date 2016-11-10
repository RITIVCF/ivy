import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SelectContact from '../sharedcomponents/SelectContact.jsx';
import GroupName from './components/GroupName.jsx';
import GroupContactControl from './components/GroupContactControl.jsx';
import GroupUserControl from './components/GroupUserControl.jsx';
import GroupPermissionControl from './GroupPermissionControl.jsx';

export default class GroupsWorkspace extends TrackerReact(React.Component) {
	constructor(props) {
    super(props);

		this.state={
			showPerm: false
		};

    // this.state = {
    //   subscription: {
    //     Churches: Meteor.subscribe("allChurches"),
		// 		contacts: Meteor.subscribe("allContacts")
    //   },
		// 	contact: false
    // };
  }

  componentWillUnmount() {
    // this.state.subscription.Churches.stop();
		// this.state.subscription.contacts.stop();
  }

	toglleAdmin(){
		Meteor.call("toggleAdminGroup", this.props.group._id, this.refs.admin.checked);
	}

	togglePerm(){
		this.setState({showPerm: !this.state.showPerm});
	}

	render() {

		return (
		<div>
			<GroupName group={this.props.group} />
			{/*<input type="checkbox" ref="admin" value={this.props.group.admingroup} onChange={this.toggleAdmin.bind(this)} />*/}
			{/*this.props.group.admingroup ? <p><i>This is an admin group.</></p>:<div></div>*/}
			{this.props.group._id!="admin"?<label>Show Permissions
			<input type="checkbox" onClick={this.togglePerm.bind(this)} /></label>
			:<div></div>}

			{this.state.showPerm?<GroupPermissionControl group={this.props.group} />:<div></div>}
			{!this.props.group.admingroup ?
			<GroupContactControl group={this.props.group} />
			:
			<GroupUserControl group={this.props.group} />}
		</div>
		)
	}
}
