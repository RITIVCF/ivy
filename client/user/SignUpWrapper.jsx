import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SelectContact from '../sharedcomponents/SelectContact.jsx';

export default class SignUpWrapper extends TrackerReact(React.Component){
  constructor(props) {
    super(props);

    this.state = {
      subscription:{
        Contacts: Meteor.subscribe("allContacts")
      },
      contact: "",
      passwordcheck: false
    };
  }

  componentWillUnmount(){
    this.state.subscription.Contacts.stop();
  }

  go(){
    FlowRouter.go("/");
  }

  getContact(email){
    return Contacts.findOne(email);
  }

  setContact(contt){
    //this.state.contact = contact;
    this.setState({contact: contt});
  }

  unset(){

  }

  checkPasswords(){
    console.log(this.refs.loginPassword.value);
    console.log(this.refs.loginPasswordCheck.value);
    if(this.refs.loginPassword.value==this.refs.loginPasswordCheck.value){
      console.log("Password Check: true");
      this.setState({passwordcheck: true});
      return true;
    }
    else{
      console.log("Password Check: false");
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

    Accounts.createUser({
      username: userVar,
      password: passwordVar,
      email: this.state.contact.email,
      contactid: this.state.contact._id
    });

    thiz.go();


    return;
  }


  render() {
    console.log("state.contact");
    console.log(this.state.contact);
    if(this.state.contact){
    return (
      <div id="card" className="panel panel-info">
        <div className="panel-heading">Ivy Sign-In</div>
        <div className="panel-body">
          <p>Hi {this.state.contact.name}. Please fill out the below fields.</p>
          <form className="publicForm" onSubmit={this.submit.bind(this)}>
            <label>Username</label> <br />
            <input type="text"
              name="username"
              required
              />
            <br />
            <br />
            {/*}<label>E-Mail</label> <br />
            <input type="text" name="email"/>
            <br />
            <br />*/}
            <label>Password</label> <br />
            <input type="password"
              name="loginPassword"
              ref="loginPassword"
              onChange={this.checkPasswords.bind(this)}
              required
              />
            <br />
            <br />
            <label>Password</label> <br />
            <input type="password"
              name="loginPasswordCheck"
              ref="loginPasswordCheck"
              onChange={this.checkPasswords.bind(this)}
              required
              />
            <br />
            <br />
            <p>Passwords Match: {this.state.passwordcheck?"Yes":"No"}</p>
            <br />
            <br />
            <input type="submit" value="Sign Up!" />
          </form>
        </div>
      </div>
    )
  }
  return(
    <div className="panel panel-info">
      <div className="panel-heading">
        Select Contact
      </div>
      <div className="panel-body">
        <p>Please select yourself from the list:</p>
          <SelectContact
            parent={this}
            unset={this.unset.bind(this)}
            initialValue={""}
            updateContact={this.setContact.bind(this)}
            ref="contact"  />
          <p>If your name does not show up, go <a href="/newcontact">here</a> to create a new contact card.</p>
      </div>
    </div>
  )
  }
}
