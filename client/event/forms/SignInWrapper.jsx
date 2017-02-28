import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SignIn from './SignIn.jsx';
export default class SignInWrapper extends TrackerReact(React.Component){
  constructor(props) {
    super(props);

    this.state = {
      subscription: {
        Event: Meteor.subscribe("Event", props.eid)/*,
        Contacts: Meteor.subscribe("allContacts")*/
      },
      id: 1
    };
  }

  componentWillUnmount(){
    this.state.subscription.Event.stop();
    //this.state.subscription.Contacts.stop();
  }

  getEvent(){
    return Events.findOne(this.props.eid);
  }

  render() {
    let ev = this.getEvent();
    if(!ev){
      return(<div></div>)
    }
    document.title = "Ivy - " + ev.name + " Sign In";
    //var contacts =[];
    //let tempcontacts = this.getContacts();
    //let contacts = this.getContacts();
    //if(!tempcontacts){
    // if(!this.state.subscription.Contacts.ready()){
    //   return(<div></div>)
    // }
    //tempcontacts.forEach(function(contact){
      //contacts.push({"name":contact.name+" "+contact.email,"value":contact._id});  for Select Search
    //});

    //console.log(contacts);


    return (
      <div key={this.state.id}>
        <SignIn parent={this} ev={ev} />
      </div>
    )
  }
}
