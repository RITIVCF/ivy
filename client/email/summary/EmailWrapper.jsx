import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import MainBox from '../../MainBox.jsx';
import Modal from '../../sharedcomponents/Modal.jsx';
import NewEmailForm from './NewEmailForm.jsx';
import EmailPreview from './EmailPreview.jsx';
import LoaderCircle from '../../LoaderCircle.jsx';
import NoPerm from '../../NoPerm.jsx';
import { loadEmail } from '/lib/emails.js';

import EmailSummary from './EmailSummary.jsx';
//Contacts = new Mongo.Collection('contacts');

export default class EmailWrapper extends TrackerReact(React.Component){
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

  openModal(){
    //this.refs.modal.open();
		let to = {
			users: [],
			groups: [],
			emails: []
		};
		Meteor.call("newEmail",
			"newsletter",
			"ivcf.rit.edu",
			to,
			function(error, result){
				if(!!error){
					Materialize.toast("Something went wrong. Please try again.", 5000);
					console.error(error);
				} else{
					Session.set("selectedEmail", result);
					//FlowRouter.go("/emails/workspace/"+result);
				}
			});
  }

	toggleInfoBar(){
    Meteor.call("toggleEmailsInfoBar");
  }

  getSubHeader(){
    return [<ul className="left" key="0">
      <li onClick={this.openModal.bind(this)}><a>
        <i className="material-icons black-text">add</i></a>
      </li>
    </ul>,
		<ul className="right" key="1">
			<li onClick={this.toggleInfoBar.bind(this)}><a>
        <i className="material-icons black-text">{Meteor.user().preferences.emails_infobar?"info":"info_outline"}</i></a>
      </li>
		</ul>]
  }

	getSelectEmail(){
		let selectedEmail = Session.get("selectedEmail");
		if(selectedEmail){
			return loadEmail(Session.get("selectedEmail"));
		}
		else{
			return undefined;
		}
	}

  render() {
    if(!this.state.subscription.email.ready()){
      return (<LoaderCircle />)
    }
    if(!checkPermission("emails")){
      return <NoPerm />
    }
    document.title="Ivy - Emails";
		let selectedEmail = this.getSelectEmail();

    return (
      <MainBox
        content={[
					<EmailSummary key={0} />,
					<Modal
						key={1}
						id={"NewEmailFormModal"}
						ref="modal"
						content={<NewEmailForm />}
					/>
				]}
        subheader={this.getSubHeader()}
        showinfobar={Meteor.user().preferences.emails_infobar}
        infobar={selectedEmail&&
					<EmailPreview email={selectedEmail} />
				}
        />
    )
  }
}
