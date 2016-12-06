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

  componentWillUnmount(){
    //this.state.subscription.Contacts.stop();
  }

  go(){
    FlowRouter.go("/");
  }

  unset(){

  }

  checkPasswords(){
    //console.log(this.refs.loginPassword.value);
    //console.log(this.refs.loginPasswordCheck.value);
    if(this.refs.loginPassword.value==this.refs.loginPasswordCheck.value){
      //console.log("Password Check: true");
      this.setState({passwordcheck: true});
      return true;
    }
    else{
      //console.log("Password Check: false");
      this.setState({passwordcheck: false});
      return false;
    }
  }

  submit(event){
    event.preventDefault();

    if(!this.checkPasswords()){
      return;
    }

    var userVar = event.target.username.value;
    var passwordVar = event.target.loginPassword.value;
    //var emailVar = event.target.email.value;

    // Meteor.call("newContact",
    //   "",
    //   emailVar,
    //   "");
    var thiz = this;

    Accounts.resetPassword(this.props.token, passwordVar, function(error){
      if(error){
        window.alert("error");
      }
      //Meteor.call("setUserUsername", userVar);
      FlowRouter.go("/");
    });
    // Accounts.createUser({
    //   username: userVar,
    //   password: passwordVar,
    //   email: this.getContact().email,
    //   contactid: this.props.cid
    // });

    //this.setState({submitted: true});


    return;
  }

  // setUsername(event){
  //   event.preventDefault();
  //   //console.log(Meteor.userId());
  //   Meteor.call("setUserUsername", this.refs.username.value);
  //   FlowRouter.go("/");
  // }


  render() {
    document.title="Ivy - Set Password";
    return (
      <div id="card" className="panel panel-info">
        <div className="panel-heading">Ivy Set Password</div>
        <div className="panel-body">
          <p>Please set a password.</p>
          <form className="publicForm" onSubmit={this.submit.bind(this)}>
          {/*}  <label>Username</label> <br />
            <input type="text"
              name="username"
              ref="username"
              required
              />
            <br />*/}
            <label>Password</label> <br />
            <input type="password"
              name="loginPassword"
              ref="loginPassword"
              onChange={this.checkPasswords.bind(this)}
              required
              />
            <br />
            <label>Password</label> <br />
            <input type="password"
              name="loginPasswordCheck"
              ref="loginPasswordCheck"
              onChange={this.checkPasswords.bind(this)}
              required
              />
            <br />
            <p>Passwords Match: {this.state.passwordcheck?"Yes":"No"}</p>
            <br />
            <input type="submit" name="submit" value="Sign Up!" />
          </form>
        </div>
      </div>
    )
  }
}
