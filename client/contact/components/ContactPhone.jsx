import React, {Component} from 'react';



export default class ContactPhone extends Component {
  updatePhone(event){  // Need one of these for each component
    event.preventDefault();
    var text= this.refs.phone.value.trim();
    Meteor.call('updatePhone', this.props.contact._id, text);
    console.log(text);
    //this.state.value = text;
  }

  handlePhoneChange(event){ // need one of these for each component
    this.setState({phone:event.target.value});
  }

  render(){
  //  let contact = this.props.contact;
    /*
  	if(!contact.phone){
  		return (<div>Loading...</div>);
  	}*/

    return(
      <div className="form-group" >
        <label>Phone</label>
          <input type="text"
            ref="phone"
            className="form-control"
            disabled={this.props.disabled}
            onBlur={this.updatePhone.bind(this)}
            onChange={this.handlePhoneChange}
            value={this.props.contact.phone}
            placeholder="000-000-0000"
          />
      </div>
    )
  }
}
