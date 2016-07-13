import React, {Component} from 'react';



export default class UserEmail extends Component {
  handleEmailChange(event){
    this.setState({email:event.target.value});
  }

  updateEmail(event){
    event.preventDefault();
    var text = this.refs.useremail.value.trim();
    Meteor.call('updateEmail', text);
    console.log(text);
    this.state.value = text;
  }

  getUser(){
		//console.log(Events.find({_id: this.props.eid}).fetch());
		//return Events.find({_id: this.props.eid}).fetch();
		return Meteor.users.findOne(this.props.uid);
	}


  render(){
    let user = this.getUser();

  	if(!user){
  		return (<div>Loading...</div>);
  	}
  	var email = user.emails[0].address;

    return(
      <div>
        <label>Email</label>
          <input type="text"
            ref="useremail"
            onBlur={this.updateEmail.bind(this)}
            onChange={this.handleEmailChange}
            value={email}
            enabled="false"
          />
      </div>
    )
  }
}
