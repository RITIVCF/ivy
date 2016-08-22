import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class SignUpWrapper extends TrackerReact(React.Component){
  constructor(props) {
    super(props);

    this.state = {};
  }

  go(){
    FlowRouter.go("/");
  }

  getContact(email){
    return Contacts.findOne(email);
  }

  submit(event){
    event.preventDefault();
    if(event.target.loginPassword.value != event.target.loginPasswordCheck.value){
      return;
    }
    var userVar = event.target.username.value;
    var passwordVar = event.target.loginPassword.value;
    var emailVar = event.target.email.value;

    Meteor.call("newContact",
      "",
      emailVar,
      "");

    Accounts.createUser({
      username: userVar,
      email: emailVar,
      password: passwordVar,
      redundantEmail: emailVar
    });


    this.go();
    return;
  }


  render() {
    return (
      <div id="card" className="card">
        <div className="front">
          <h1>Ivy Sign-In</h1>
          <form className="publicForm" onSubmit={this.submit.bind(this)}>
            <label>Username</label> <br />
            <input type="text" name="username"/>
            <br />
            <br />
            <label>E-Mail</label> <br />
            <input type="text" name="email"/>
            <br />
            <br />
            <label>Password</label> <br />
            <input type="password" name="loginPassword"/>
            <br />
            <br />
            <label>Password</label> <br />
            <input type="password" name="loginPasswordCheck"/>
            <br />
            <br />
            <input type="submit" value="SignUp!" />
          </form>
        </div>
      </div>
    )
  }
}
