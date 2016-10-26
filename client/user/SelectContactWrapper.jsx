import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SelectContact from '../sharedcomponents/SelectContactNoUser.jsx';

export default class SelectContactWrapper extends TrackerReact(React.Component){
  constructor(props) {
    super(props);

    this.state = {
      subscription:{
        Contacts: Meteor.subscribe("allContacts")
      },
      contact: false,
      submitted: false
    };
  }

  componentWillUnmount(){
    this.state.subscription.Contacts.stop();
  }

  setContact(contt){
    //this.state.contact = contact;
    this.setState({contact: contt});
  }

  unset(){

  }

  submit(event){
    event.preventDefault();
    if(!this.state.contact){
      return;
    }
    //console.log(this.state.contact);
    Meteor.call("createNewUser", this.state.contact.email, this.state.contact._id);
    this.setState({submitted: true});

  }


  render() {
    if(!this.state.submitted){


    return(
      <div className="panel panel-info">
        <div className="panel-heading">
          Select Contact
        </div>
        <div className="panel-body">
          <p>An email will be sent to your email with a sign up link.</p>
          <p>Please select yourself from the list:</p>
            <SelectContact
              parent={this}
              unset={this.unset.bind(this)}
              users={false}
              initialValue={""}
              updateContact={this.setContact.bind(this)}
              ref="contact"  />
            <p>If your name does not show up, go <a href="/newcontact">here</a> to create a new contact card.</p>
        </div>
        <form onSubmit={this.submit.bind(this)}>
          <input type="submit" name="submit" value="Send Confirmation"/>
        </form>
      </div>
    )
  }
  else{
    return(
      <div className="panel panel-info">
        <div className="panel-heading">
          Select Contact
        </div>
        <div className="panel-body">
          <p>Please check your email and follow the link.</p>
        </div>
      </div>
    )
  }
  }
}
