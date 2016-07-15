import React, {Component} from 'react';



export default class UserEmail extends Component {
  handleEmailChange(event){
    this.setState({email:event.target.value});
  }

  updateEmail(event){
    event.preventDefault();
    var text = this.refs.useremail.value.trim();
    Meteor.call('updateEmail', this.props.user._id, text);
    console.log(text);
    this.state.value = text;
  }

  getUser(){
		//console.log(Events.find({_id: this.props.eid}).fetch());
		//return Events.find({_id: this.props.eid}).fetch();
		return Meteor.user();
	}


  render(){
    let user = this.props.user;

  	if(!user.email){
  		return (<div>Loading...</div>);
  	}

    return(
      <div>
        <label>Email</label>
          <input type="text"
            ref="useremail"
            onBlur={this.updateEmail.bind(this)}
            onChange={this.handleEmailChange}
            value={user.email}
          />
      </div>
    )
  }
}
