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

	resetPass(){
		var thiz = this;
		if(window.confirm("Are you sure?")){
			this.state.ran=true;
			Meteor.call("passReset", this.props.uid, function(error,result){
				if(error){
					console.log(error);
					thiz.props.parent.postError();
				}
				thiz.props.parent.postSuccess();
			});
		}
	}


	go(){
		if(this.state.ran){
			return;
		}
    FlowRouter.go("/contacts/"+this.state.user.contact);
  }

	render() {
		var user = this.getUser(this.props.uid);
		return (
			<tr onClick={this.go.bind(this)} id="hover-me">
				<td>{user.name}</td>
				<td>{user.email}
					<button
						className="btn btn-info"
						onClick={this.resetPass.bind(this)}
						id="hover-content"
						style={{float: "right"}} >
							Reset Password
					</button>
				</td>
			</tr>
		)
	}
}
