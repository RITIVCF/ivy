import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import MainBox from '../../MainBox.jsx';
import EmailWorkspace from './EmailWorkspace.jsx'
import LoaderCircle from '../../LoaderCircle.jsx';
import NoPerm from '../../NoPerm.jsx';

import EmailWorkspacePanel from './EmailWorkspacePanel.jsx';

//Contacts = new Mongo.Collection('contacts');

export default class EmailWorkspaceWrapper extends TrackerReact(React.Component){
  constructor() {
    super();

    this.state = {
      subscription: {
        email: Meteor.subscribe("myEmails")
      }
    };


  }

  componentWillUnmount() {
    this.state.subscription.email.stop();
  }

	getEmail(){
		return Emails.findOne(this.props.emid);
	}

  render() {
    if(!this.state.subscription.email.ready()){
      return (<LoaderCircle />)
    }
    if(!checkPermission("emails")){
      return <NoPerm />
    }
    document.title="Ivy - Email Workspace";
		let email = this.getEmail();

    return (
      <MainBox
        content={<EmailWorkspace email={email} />}
        subheader={false}
        showinfobar={true}
        infobar={<EmailWorkspacePanel email={email} />}
        />
    )
  }
}
