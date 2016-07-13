import React, {Component} from 'react';



export default class UserPhone extends Component {
  updatePhone(event){  // Need one of these for each component
    event.preventDefault();
    var text= this.refs.phone.value.trim();
    Meteor.call('updatePhone', text);
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
    let user = this.getUser();

  	if(!user){
  		return (<div>Loading...</div>);
  	}
  	var phone = user.phone;

    return(
      <div>
        <label>Phone</label>
          <input type="text"
            ref="phone"
            onBlur={this.updatePhone.bind(this)}
            onChange={this.handlePhoneChange}
            value={phone}
          />
      </div>
    )
  }
}
