import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class LoginWrapper extends TrackerReact(React.Component){
  constructor(props) {
    super(props);
    //console.log(props.route);
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
    var userVar = event.target.email.value;
    var passwordVar = event.target.loginPassword.value;
    var thiz = this;
    Meteor.loginWithPassword(userVar, passwordVar, function(error){
      //console.log("Callback returned.");
      if(error){
        //console.log("Error true.");
        thiz.setState({forgot: true});
        thiz.refs.password.value = "";
      }
      else{
        //console.log("error not true");
        thiz.go();
      }
    });
  }


  render() {
    document.title="Ivy - Login";
    return (
        <div className="row">
          <div className="col s12 m8 offset-m2">
            <div className="card">
              <div className="card-content">
                <span className="card-title">Ivy Sign In</span>
                  <form className="publicForm" onSubmit={this.submit.bind(this)}>
                    {this.state.forgot?<p>Incorrect username or password. Please try again or click 'forgot password'.</p>:""}
                    <div className="input-field col s12">
                      <input type="text" name="email" /> 
                      <label>Email</label>
                    </div>
                    <div className="input-field col s12">
                      <input type="password" name="loginPassword" ref="password" />
                      <label>Password</label>
                    </div>
                    <button className="btn waves-effect waves-light" type="submit" name="action">Login
                    </button>
                  </form>
                  <br />
                  <br />
                  <a className="waves-effect waves-teal btn-flat" onClick={this.createAccount.bind(this)} >Create An Account</a>
                  <a className="waves-effect waves-teal btn-flat" onClick={this.forgotPassword.bind(this)} >Forgot Password</a>
              </div>
            </div>
          </div>
        </div>
    )
  }
}
