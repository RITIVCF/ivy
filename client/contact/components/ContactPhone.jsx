import React, {Component} from 'react';



export default class ContactPhone extends Component {
  updatePhone(event){
    event.preventDefault();
    var text= this.refs.phone.value.trim();
    this.props.contact.setPhone(text);
  }

  handlePhoneChange(event){
    this.setState({phone:event.target.value});
  }

  render(){
    return(
      <div className="input-field" >
          <input type="text"
            ref="phone"
            id="contact_phone"
            disabled={this.props.disabled}
            onBlur={this.updatePhone.bind(this)}
            onChange={this.handlePhoneChange}
            value={this.props.contact.getPhone()}
            placeholder="000-000-0000"
          />
        <label htmlFor="contact_phone" className="active">Phone</label>
      </div>
    )
  }
}
