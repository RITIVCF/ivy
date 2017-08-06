import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import MainBox from '../../MainBox.jsx';
import EmailWorkspace from './EmailWorkspace.jsx'
import LoaderCircle from '../../LoaderCircle.jsx';
import NoPerm from '../../NoPerm.jsx';

import EmailWorkspacePanel from './EmailWorkspacePanel.jsx';
import { loadEmail } from '/lib/emails.js';

//Contacts = new Mongo.Collection('contacts');

export default class EmailWorkspaceWrapper extends TrackerReact(React.Component){
  constructor() {
    super();

    this.state = {
      subscription: {
        email: Meteor.subscribe("myEmails"),
        events: Meteor.subscribe("emailEvents")
      }
    };


  }

  componentWillUnmount() {
    this.state.subscription.email.stop();
    this.state.subscription.events.stop();
  }

	getEmail(){
		return loadEmail(this.props.emid);
	}

  render() {
    if(!this.state.subscription.email.ready()){
      return (<LoaderCircle />)
    }
    if(!checkPermission("emails")){
      return <NoPerm />
    }
    setDocumentTitle("Email Workspace");
		let email = this.getEmail();
		console.log("Email: ", email);

    return (
      <MainBox
        content={<EmailWorkspace email={email} />}
        subheader={<ul style={{marginLeft: "20px"}} className="black-text">{email.subject}</ul>}
        showinfobar={true}
        infobar={<EmailWorkspacePanel email={email} />}
        />
    )
  }
}
