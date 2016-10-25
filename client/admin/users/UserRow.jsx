import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';


export default class UserRow extends TrackerReact(React.Component) {
	constructor(props){
		super(props);

		this.state = {
			user: this.getUser(props.uid)
		};

	}

	getUser(uid){
		var user = Meteor.users.findOne(uid);
		var contact = Contacts.findOne(user.contact);
		user.name = contact.name;
		user.email = contact.email;
		return user;
	}

	go(){
    FlowRouter.go("/contacts/"+this.state.user.contact);
  }

	render() {
		var user = this.getUser(this.props.uid);
		return (
			<tr onClick={this.go.bind(this)}>
				<td>{user.name}</td>
				<td>{user.email}</td>
			</tr>
		)
	}
}
