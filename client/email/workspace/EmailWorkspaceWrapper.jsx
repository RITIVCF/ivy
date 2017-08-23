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
  constructor(props) {
    super(props);

    this.state = {
      subscription: {
        email: Meteor.subscribe("myEmails"),
        events: Meteor.subscribe("emailEvents", this.props.emid)
      }
    };


  }

  sendToMe() {
    Meteor.call("sendToMe", this.props.emid, (error) => {
			if(error) {
				Materialize.toast("Could not send email", 2000);
			} else {
				Materialize.toast("Sent to you", 2000);
			}
		});
  }

  getSubHeader(email) {
    return [<ul key="0" style={{marginLeft: "20px"}} className="left black-text">{email.subject}</ul>,
    <ul key="1" style={{marginRight: "20px"}} className="right">
      <li onClick={this.sendToMe.bind(this)}>
        <a className="black-text">Send to me</a></li>
    </ul>]
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

    return (
      <MainBox
        content={<EmailWorkspace email={email} />}
        subheader={this.getSubHeader(email)}
        showinfobar={true}
        infobar={<EmailWorkspacePanel email={email} />}
        />
    )
  }
}
