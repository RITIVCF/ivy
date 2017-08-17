import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SelectUser from '../sharedcomponents/SelectUser.jsx';

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
    var thiz= this;
    Meteor.call("enrollUser", this.state.contact._id, function(error){
      if(error){
        window.alert("Sorry something went wrong. Please try again.");
        console.log(error);
      }
      else{
        thiz.setState({submitted: true});
      }
    });

  }


  render() {
    if(!this.state.submitted){


    return(
      <div className="card">
        <div className="card-content">
          <h5>Select Contact</h5>
          <p>An email will be sent to your email with a sign up link.</p>
          <p>Please select yourself from the list:</p>
					<SelectUser
						id="selectcontact"
						parent={this}
						unset={this.unset.bind(this)}
						unCreated={true}
						initialValue={""}
						updateUser={this.setContact.bind(this)}
					ref="contact"  />
					{!this.state.contact?
						<p>If your name does not show up, go <a href="/public/newcontact">here</a> to create a new contact card.</p>
              :""}
        </div>
        {!this.state.contact?"":
        <div className="card-action">
            <a className="waves-effect waves-light btn" onClick={this.submit.bind(this)} >Send Confirmation</a>
        </div>}
      </div>
    )
  }
  else{
    return(
      <div className="card">
        <div className="card-content">
          <h5>Select Contact</h5>
          <p>Please check your email and follow the link.</p>
        </div>
      </div>
    )
  }
  }
}
