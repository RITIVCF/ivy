import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SelectContact from '../sharedcomponents/SelectContact.jsx';
import GroupName from './components/GroupName.jsx';
import GroupContactControl from './components/GroupContactControl.jsx';
import GroupUserControl from './components/GroupUserControl.jsx';
import GroupPermissionControl from './GroupPermissionControl.jsx';
import SelectUser from '../sharedcomponents/SelectUser.jsx';
import { getUsers } from '/lib/users.js';

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

	componentDidMount(){
		Materialize.updateTextFields();
	}

  componentWillUnmount() {
    // this.state.subscription.Churches.stop();
		// this.state.subscription.contacts.stop();
  }

	shouldComponentUpdate(nextProps, nextState){
		if(nextProps.group._id=="admin"){
			//this.setState({showPerm: false});
			this.state.showPerm = false;
		}
		return true;
	}

	toglleAdmin(){
		Meteor.call("toggleAdminGroup", this.props.group._id, this.refs.admin.checked);
	}

	togglePerm(){
		this.setState({showPerm: !this.state.showPerm});
	}

	setLeader(user){
		Meteor.call("setGroupLeader", this.props.group._id, user._id);
	}

	getLeaders(){
		let query = {_id:
			{$in: this.props.group.leader}
		};
		return getUsers(query);
	}

	unsetLeader(user){
		Meteor.call("unsetGroupLeader", this.props.group._id, user._id);
	}

	render() {
		if(!this.props.group){
			return <div>
				<h5>Groups Workspace</h5>
				<p>Please select a group to continue.</p>
			</div>
		}

		let hasLeaders = (
			this.props.group.type=="Small Group"||
			this.props.group.type=="Team"
		);
		let leaders = [];
		if(hasLeaders){
			leaders = this.getLeaders();
		}
		return (
		<div className="row">
			<div className="col s12">
				<GroupName group={this.props.group} />
				{/*<input type="checkbox" ref="admin" value={this.props.group.admingroup} onChange={this.toggleAdmin.bind(this)} />*/}
				{/*this.props.group.admingroup ? <p><i>This is an admin group.</></p>:<div></div>*/}
				{this.props.group._id!="admin"?<GroupPermissionControl group={this.props.group} />:false}
				{hasLeaders&&
					<div className="row">
						<div className="col s12">
							<p>Add leaders to the group:</p>
							<SelectUser
								initialValue={""}
								updateUser={this.setLeader.bind(this)}
								id="leaderselect"
							ref="leader" />
							<table>
								<thead>
									<tr>
										<th>Name</th>
										<th>Email</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{leaders.map((user)=>{
										return <tr key={user._id}  id="showhim">
											<td>{user.getName()}</td>
											<td>{user.getEmail()}</td>
											<td>{leaders.length>1 && <span className="material-icons"
												id="showme"
												name={user._id}
												onClick={this.unsetLeader.bind(this,user)}>close
											</span>}
											</td>
										</tr>
									})}
								</tbody>
							</table>
							{/*<SelectUser
								initialValue={this.getLeaders()}
								id="leaderselect"
								keepName={true}
								unset={this.unset.bind(this)}
								updateUser={this.setLeader.bind(this)}
								ref="leader" />
								for refresh
							*/}
						</div>
					</div>}
				<GroupUserControl group={this.props.group} />
			</div>
		</div>
		)
	}
}
