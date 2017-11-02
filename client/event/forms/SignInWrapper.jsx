import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SignIn from './SignIn.jsx';
export default class SignInWrapper extends TrackerReact(React.Component){
  constructor(props) {
    super(props);

    this.state = {
      subscription: {
        Event: Meteor.subscribe("Event", props.eid),
				contacts: Meteor.subscribe("allContacts"),
				graduatedContacts: Meteor.subscribe("graduatedContacts"),
				expiredContacts: Meteor.subscribe("expiredContacts"),
				outofscopeContacts: Meteor.subscribe("outofscopeContacts")
      },
      id: 1
    };
  }

  componentWillUnmount(){
		Object.keys(this.state.subscription).forEach((key)=>{
	    this.state.subscription[key].stop();
	  });
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

    return (
      <div key={this.state.id}>
        <SignIn parent={this} ev={ev} />
      </div>
    )
  }
}
