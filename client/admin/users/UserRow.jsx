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
		this.state.ran=true;
		if(window.confirm("Are you sure?")){
			Meteor.call("passReset", this.props.uid, function(error,result){
				if(error){
					console.log(error);
					Materialize.toast('Oops! Looks like something went wrong. Try again later. If the problem persists, '
						+ 'contact support.', 4000);
				}
				Materialize.toast('Success! Password reset has been sent.', 4000);
			});
		}
	}


	go(){
		if(this.state.ran){
			this.state.ran=false;
			return;
		}
    FlowRouter.go("/contacts/"+this.state.user.contact);
  }

	openUser(){
		this.state.ran=true;
			FlowRouter.go("/admin/users/"+this.props.uid);

	}

	render() {
		var user = this.getUser(this.props.uid);
		return (

			<div className="col s12 m6 l4">
				<div className="card-panel left hoverable">
					<div className="card-image">
	          <img src="/images/defaultPic.png" style={{width: "25%"}} className="circle responsive-img" />
	        </div>
					<div className="card-content">
						<span className="card-title">{user.name}</span>
					</div>
					<div className="card-action">
						<button className="btn" onClick={this.resetPass.bind(this)}>Reset Pass</button>
						<button className="btn" onClick={this.openUser.bind(this)}>Groups</button>
					</div>
				</div>
			</div>
		)
	}
}
