import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import NewContactForm from './NewContactForm.jsx';

export default class NewContactWrapper extends TrackerReact(React.Component){
  constructor(props) {
    super(props);

    this.state = {
      subscription: {
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

	subsReady(){
		let ready = true;
		Object.keys(this.state.subscription).forEach((key)=>{
	    if(!this.state.subscription[key].ready()){
				ready = false;
			};
	  });
		return ready;
	}

  render() {
		setDocumentTitle("New Contact");
		if(!this.subsReady()){
			return <div></div>
		}
    return (
      <div key={this.state.id}>
        <NewContactForm route={this.props.route} />
      </div>
    )
  }
}
