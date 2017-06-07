import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import MainBox from '../../MainBox.jsx';
import Modal from '../../sharedcomponents/Modal.jsx';
import NewEmailForm from './NewEmailForm.jsx';
import EmailPreview from './EmailPreview.jsx';
import LoaderCircle from '../../LoaderCircle.jsx';
import NoPerm from '../../NoPerm.jsx';

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
    this.refs.modal.open();
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

  render() {
    if(!this.state.subscription.email.ready()){
      return (<LoaderCircle />)
    }
    if(!checkPermission("emails")){
      return <NoPerm />
    }
    document.title="Ivy - Emails";

    return (
      <MainBox
        content={[
					<EmailSummary />,
					<Modal
						id={"NewEmailFormModal"}
						ref="modal"
						content={<NewEmailForm />}
						/>
					]}
        subheader={this.getSubHeader()}
        showinfobar={Meteor.user().preferences.emails_infobar}
        infobar={
					<EmailPreview emid={Session.get("selectedEmail")} />
				}
        />
    )
  }
}
