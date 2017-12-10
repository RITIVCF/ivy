import {Meteor} from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { insertStatus } from '/lib/contactStatus.js';
import { insertAndUpdateFunnelStatus } from '/server/funnelMethods.js';

const DEFAULT_FUNNEL_STATUS = "Contact";

Accounts.onCreateUser(function(options, user) {
  if (options.profile){
    user.profile = options.profile;
  }

	let userDoc = options;

  user.name=userDoc.name;

	// Phone
	if(!userDoc.phone){
		user.phone = "";
	} else {
		user.phone = userDoc.phone;
	}

	// Major
	if(!userDoc.major){
		user.major = "";
	} else {
		user.major = userDoc.major;
	}

	// How did you hear about us?
	if(!userDoc.howhear){
		user.howhear = "";
	} else {
		user.howhear = userDoc.howhear;
	}

	// Bio
	if(!userDoc.bio){
		user.bio = "";
	} else {
		user.bio = userDoc.bio;
	}

	// Contact Follow Up Ticket
	if(!userDoc.ticket){
		user.ticket = "";
	} else {
		user.ticket = userDoc.ticket;
		Tickets.update(userDoc.ticket, {$set: {customer: user._id}});
	}

	// Addresses
	if(!userDoc.addresses){
		user.addresses = [];
	} else {
		user.addresses = userDoc.addresses;
	}

	// Affiliations
	if(!userDoc.affiliations){
		user.affiliations = [];
	} else {
		user.affiliations = userDoc.affiliations;
	}

	// Community Life
	if(!userDoc.communitylife){
		user.communitylife = [];
	} else {
		user.communitylife = userDoc.communitylife;
	}

	// Funnel Status
	if(!userDoc.funnelStatus){
		user.funnelStatus = DEFAULT_FUNNEL_STATUS;
	} else {
		user.funnelStatus = userDoc.funnelStatus;
	}
	insertAndUpdateFunnelStatus(user._id, user.funnelStatus);

	// Newsletter
	if(userDoc.newsletter === undefined){
		user.newsletter = false;
	} else {
		user.newsletter = userDoc.newsletter;
	}

	// Contact Status
	if(!userDoc.status){
		if(userDoc.isUser){
			user.status = "User";
			delete userDoc.isUser;
		}
		else{
			user.status = "Present";
		}
	}

	// Created At
	user.createdAt = new Date();

  // Initialize User Preferences
  user.preferences={
    "theme-color": "Default",
    "contacts_view":"Tile",
    "contacts_infobar": true,
    "tickets_view":"List",
    "tickets_infobar":true,
    "calendar_view":"month",
    "events_infobar":true,
    "churches_view":"Tile",
    "churches_infobar":true
  };

	// set up funnel calculation jobs
	setupStatusJobs(user._id);

	// insert inital status record
	insertStatus(user._id, user.status);

  return user;
});

Accounts.onEnrollmentLink= function(token,done){
  //Accounts.resetPassword()
  FlowRouter.go("/public/signup/"+token);
};



Accounts.emailTemplates.sitename = "Ivy";
Accounts.emailTemplates.from = "Ivy <no-reply@ivy.rit.edu>";
Accounts.emailTemplates.enrollAccount.subject = function(user){
  return "Ivy Account Creation Email Confirmation";
};
Accounts.emailTemplates.enrollAccount.text = function(user, url){
  //var name = Contacts.findOne(user.contact).name;
  var name = user.name;
  return "Dear "+ name + "\n\nPlease follow the link below to set your password:\n\n"
  + "Confirmation link: " + url;
};
Accounts.emailTemplates.resetPassword.from = function(){
  return "Ivy Password Reset <no-reply@ivy.rit.edu>";
}
