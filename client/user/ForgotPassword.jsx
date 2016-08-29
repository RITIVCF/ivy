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
    Accounts.forgotPassword({email: event.target.email.value});
    this.setState({submitted: true});

  }


  render() {
    if(this.state.submitted){
      return (
        <div id="card" className="card">
          <div className="front">
            <h1>Forgot Password</h1>
            <p>Check your email for a link to reset your password.</p>
          </div>
        </div>
      )
    }
    return (
      <div id="card" className="card">
        <div className="front">
          <h1>Forgot Password</h1>
          <p>Please enter your email below.</p>
          <form className="publicForm" onSubmit={this.submit.bind(this)}>
            <label>Email</label> <br />
            <input type="text" name="email"/>

            <input type="submit" value="Send" />
          </form>
        </div>
      </div>
    )
  }
}
