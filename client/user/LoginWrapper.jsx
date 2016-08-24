import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class LoginWrapper extends TrackerReact(React.Component){
  constructor(props) {
    super(props);
    console.log(props.route);

  }

  go(){
    if(this.props.route){
      FlowRouter.go(this.props.route);
    }
    else{
      FlowRouter.go("/");  
    }
  }

  createAccount(){
    FlowRouter.go("/signup");
  }

  submit(event){
    event.preventDefault();
    var userVar = event.target.username.value;
    var passwordVar = event.target.loginPassword.value;
    var thiz = this;
    Meteor.loginWithPassword(userVar, passwordVar, function(){
      thiz.go();
    });
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
          <br />
          <br />
          <button onClick={this.createAccount.bind(this)} >Create An Account</button>
        </div>
      </div>
    )
  }
}
