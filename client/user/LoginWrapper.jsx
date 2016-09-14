import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class LoginWrapper extends TrackerReact(React.Component){
  constructor(props) {
    super(props);
    console.log(props.route);
    this.state = {
      forgot: false
    }
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

  forgotPassword(event){
    event.preventDefault();
    FlowRouter.go("/forgotpassword");
  }

  submit(event){
    event.preventDefault();
    var userVar = event.target.username.value;
    var passwordVar = event.target.loginPassword.value;
    var thiz = this;
    Meteor.loginWithPassword(userVar, passwordVar, function(error){
      console.log("Callback returned.");
      if(error){
        console.log("Error true.");
        thiz.setState({forgot: true});
        thiz.refs.password.value = "";
      }
      else{
        console.log("error not true");
        thiz.go();
      }
    });
  }


  render() {
    document.title="Ivy - Login";
    return (
      <div id="card" className="card">
        <div className="front">
          <h1>Ivy Sign-In</h1>
          <form className="publicForm" onSubmit={this.submit.bind(this)}>
            <label>Username</label> <br />
            {this.state.forgot?<p>Incorrect username or password. Please try again or click 'forgot password'.</p>:""}
            <input type="text" name="username" />
            <br />
            <br />
            <label>Password</label> <br />
            <input type="password" name="loginPassword" ref="password" />
            <br />
            <br />
            <input type="submit" value="Login" />
          </form>
          <br />
          <br />
          <button  onClick={this.createAccount.bind(this)} >Create An Account</button>
          <button style={{float: 'right'}} onClick={this.forgotPassword.bind(this)} >Forgot Password</button>
        </div>
      </div>
    )
  }
}
