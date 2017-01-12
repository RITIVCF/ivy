import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SelectUser from '../../sharedcomponents/SelectUser.jsx';
import Contact from './Contact.jsx';


export default class GroupContactControl extends TrackerReact(React.Component) {
	constructor(props) {
    super(props);

  }

  componentWillUnmount() {

  }

	addContact(contact){
		Meteor.call("addContactToGroup", this.props.group._id, contact._id);
		contact.component.state.value="";
		contact.component.forceUpdate();
	}

	unset(){

	}

	render() {

		return (
		<div>

			<p>Add contacts to the group:</p>
			<SelectUser
				parent={this}
				unset={this.unset.bind(this)}
				updateUser={this.addContact.bind(this)}
				ref="contact" />
			<table>
				<thead>
					<tr>
						<th>Remove</th>
						<th>Name</th>
						<th>Email</th>
					</tr>
				</thead>
				<tbody>
					{this.props.group.contacts.map((cid)=>{
						return <Contact key={cid} gid={this.props.group._id} cid={cid} />
					})}
				</tbody>
			</table>
		</div>
		)
	}
}
