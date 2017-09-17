import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class SignUpWrapper extends TrackerReact(React.Component){
  constructor(props) {
    super(props);

    this.state = {
      passwordcheck: false,
      submitted: false
    };
  }

  go(){
    FlowRouter.go("/");
  }

  unset(){

  }

  checkPasswords(){
    if(this.refs.loginPassword.value==this.refs.loginPasswordCheck.value){
      this.setState({passwordcheck: true});
      return true;
    }
    else{
      this.setState({passwordcheck: false});
      return false;
    }
  }

  submit(event){
    event.preventDefault();

    if(!this.checkPasswords()){
      return;
    }

    var passwordVar = event.target.loginPassword.value;

    var thiz = this;

    Accounts.resetPassword(this.props.token, passwordVar, function(error){
      if(error){
        window.alert("error");
      }

      FlowRouter.go("/");
    });

    return;
  }

  render() {
    
    return (
      <div className="card">
        <div className="card-content">
          <span className="card-title">Ivy Set Password</span>
          <div className="row">
            <p>Please set a password.</p>
          </div>
					<form className="publicForm" onSubmit={this.submit.bind(this)}>

						<div className="input-field">
							<input type="password"
								name="loginPassword"
								ref="loginPassword"
								id="pass1"
								onChange={this.checkPasswords.bind(this)}
								required
							/>
							<label htmlFor="pass1">Password</label>
						</div>
						<div className="input-field">
							<input type="password"
								name="loginPasswordCheck"
								ref="loginPasswordCheck"
								id="pass2"
								onChange={this.checkPasswords.bind(this)}
								required
							/>
							<label htmlFor="pass2">Confirm Password</label>
						</div>
						<p>Passwords Match: {this.state.passwordcheck?"Yes":"No"}</p>
						<button id="submit-circle" className="btn-floating btn-large iv-blue waves-effect waves-light right" type="submit" name="action">
							<span id="sign-in-button">
								<i className="material-icons">send</i>
							</span>
						</button>
					</form>
        </div>
      </div>
    )
  }
}
