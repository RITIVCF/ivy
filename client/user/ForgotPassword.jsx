import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class LoginWrapper extends TrackerReact(React.Component){
  constructor(props) {
    super(props);
    this.state = {
      submitted: false
    }
  }


  submit(event){
    event.preventDefault();
    var thiz = this;
    Accounts.forgotPassword({email: event.target.email.value}, function(error){
      if(error){
        window.alert(error+"\n\nCannot find email. Please enter the email in the system.");
      }
      else{
        thiz.setState({submitted: true});
      }
    });

  }


  render() {
    if(this.state.submitted){
      return (
        <div id="card" className="card">
          <div className="card-content">
            <span className="card-title">Forgot Password</span>
            <p>Check your email for a link to reset your password.</p>
          </div>
        </div>
      )
    }
    return (
      <div id="card" className="card">
        <div className="card-content">
          <span className="card-title">Forgot Password</span>
          <p>Please enter your email below.</p>
          <form className="publicForm" onSubmit={this.submit.bind(this)}>
            <label>Email</label> <br />
            <input type="text" name="email"/>

            <input type="submit" value="Send" className="btn" />
          </form>
        </div>
      </div>
    )
  }
}
