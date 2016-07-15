import React, {Component} from 'react';



export default class UserPhone extends Component {
  updatePhone(event){  // Need one of these for each component
    event.preventDefault();
    var text= this.refs.phone.value.trim();
    Meteor.call('updatePhone', this.props.user._id, text);
    console.log(text);
    this.state.value = text;
  }

  handlePhoneChange(event){ // need one of these for each component
    this.setState({phone:event.target.value});
  }

  getUser(){
		//console.log(Events.find({_id: this.props.eid}).fetch());
		//return Events.find({_id: this.props.eid}).fetch();
		return Meteor.user();
	}


  render(){
    let user = this.props.user;

  	if(!user.phone){
  		return (<div>Loading...</div>);
  	}

    return(
      <div>
        <label>Phone</label>
          <input type="text"
            ref="phone"
            onBlur={this.updatePhone.bind(this)}
            onChange={this.handlePhoneChange}
            value={user.phone}
            placeholder="000-000-0000"
          />
      </div>
    )
  }
}
