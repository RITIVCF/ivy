import React, {Component} from 'react';



export default class ContactEmail extends Component {
  handleEmailChange(event){
    this.setState({email:event.target.value});
  }

  updateEmail(event){
    event.preventDefault();
    var text = this.refs.email.value.trim();
    this.props.contact.setEmail(text);
  }

  render(){
    return(
      <div className="input-field">
        <input type="email"
          ref="email"
          class="validate"
          id="contact_email"
          disabled={this.props.contact.isUser()}
          onBlur={this.updateEmail.bind(this)}
          onChange={this.handleEmailChange}
          value={this.props.contact.getEmail()}
        />
      <label htmlFor="contact_email">Email</label>
      </div>
    )
  }
}
