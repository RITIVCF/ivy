import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import MainBox from '../../MainBox.jsx';
import NewEmailForm from './NewEmailForm.jsx';
import EmailPreview from './EmailPreview.jsx';
import NewEmail from './NewEmail';
import LoaderCircle from '../../LoaderCircle.jsx';
import NoPerm from '../../NoPerm.jsx';
import { NavbarItem } from '/client/materialize';
import { loadEmail } from '/lib/emails.js';
import { getUser } from '/lib/users.js';

import EmailSummary from './EmailSummary.jsx';
//Contacts = new Mongo.Collection('contacts');

export default class EmailWrapper extends TrackerReact(React.Component){
  constructor() {
    super();

    this.state = {
			open: false,
      subscription: {
        email: Meteor.subscribe("myEmails")
      }
    };


  }

  componentWillUnmount() {
    this.state.subscription.email.stop();
  }

	closeModal(){
		this.setState({open: false});
	}

  openModal(){
    //this.setState({open: true});
		let to = {
			users: [],
			groups: [],
			emails: []
		};
		Meteor.call("newEmail",
			"newsletter",
			"InterVarsity Christian Fellowship <ivcf@rit.edu>",
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

  goToNewsletter(){

  }

  getSubHeader(){
    return [

      <ul className="left" key="0">
        <NewEmail />
      </ul>,

    	<ul className="right" key="1">
    		<li onClick={this.toggleInfoBar.bind(this)}><a>
          <i className="material-icons black-text">{Meteor.user().preferences.emails_infobar?"info":"info_outline"}</i></a>
        </li>
    	</ul>,

      <ul key="2" style={{marginRight: "20px"}} className="right">
        {this.getTemplateButtons()}
      </ul>

    ];
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

		let selectedEmail = this.getSelectEmail();

    return (
      <MainBox
        content={[
					<EmailSummary key={0} />,
					<Modal
						key={1}
						open={this.state.open}
						onClose={this.closeModal.bind(this)}
					>
						<NewEmailForm />
					</Modal>
				]}
        subheader={this.getSubHeader()}
        showinfobar={Meteor.user().preferences.emails_infobar}
        infobar={selectedEmail&&
					<EmailPreview email={selectedEmail} />
				}
        />
    )
  }

  getTemplateButtons() {
    let buttons = [];

    if ( checkPermission('ivrep') ) {
      buttons.push(
        <TemplateEditButton key="newsletter" templateID="newsletter" text="Edit Newsletter Template" />
      );

      buttons.push(
        <TemplateEditButton key="eventfollowup" templateID="eventfollowup" text="Edit Event Follow Up Template" />
      );
    }

    if ( getUser(Meteor.userId()).isPrayerGroupLeader ) {
      buttons.push(
        <TemplateEditButton key="prayergroup" templateID="prayergroup" text="Edit Prayer Group Template" />
      );
    }

    return buttons;
  }

}

function TemplateEditButton({ templateID, text }) {
  return (
    <NavbarItem href={"/emails/workspace/" + templateID} >
      <span className="black-text">
        {text}
      </span>
    </NavbarItem>
  )
}
