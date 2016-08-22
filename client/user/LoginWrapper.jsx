import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class LoginWrapper extends TrackerReact(React.Component){
  constructor(props) {
    super(props);

    this.state = {};
  }

  go(){
    FlowRouter.go("/");
  }



  submit(event){
    event.preventDefault();
    var userVar = event.target.username.value;
    var passwordVar = event.target.loginPassword.value;
    Meteor.loginWithPassword(userVar, passwordVar);
    this.go();
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
            <label>Password</label> <br />
            <input type="password" name="loginPassword"/>
            <br />
            <br />
            <input type="submit" value="Login" />
          </form>
        </div>
      </div>
    )
  }
}
