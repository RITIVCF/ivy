import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class ForgotPassword extends TrackerReact(React.Component){
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      matched: false

    }
  }

  checkMatch(){
    if(this.refs.newpass.value==""||this.refs.confirmpass.value==""){
      this.setState({matched: false});
      return;
    }
    if(this.refs.newpass.value==this.refs.confirmpass.value){
      this.setState({matched: true});
    }else{
      this.setState({matched: false});
    }
  }

  resetPass(event){
    event.preventDefault();
    Accounts.resetPassword(this.props.token, this.refs.newpass.value, function(error){
      if(error){
        window.alert("Oops. Something went wrong. Please send this to Alex (awe6013@rit.edu)\n\n"+error);
        return;
      }else{
        FlowRouter.go("/");
      }
    });
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
    if(this.props.token){
      return (
        <div className="card">
          <div className="card-content">
            <span className="card-title">Forgot Password Reset</span>
            <div className="row">
            <form onSubmit={this.resetPass.bind(this)}>
              <div className="col s12">
                <div className="input-field">
                  <input type="password" ref="newpass" id="newpass" onChange={this.checkMatch.bind(this)} />
                  <label htmlFor="newpass">New Password</label>
                </div>
                <div className="input-field">
                  <input type="password" ref="confirmpass" id="confirmpass" onChange={this.checkMatch.bind(this)} />
                  <label htmlFor="confirmpass">Confirm Password</label>
                </div>
                {this.state.matched&&
                <button id="submit-circle" className="btn-floating btn-large iv-blue waves-effect waves-light right" type="submit" name="action">
                  <i className="material-icons">send</i>
                </button>}
              </div>
            </form>
            </div>

          </div>
        </div>
      )
    }
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
