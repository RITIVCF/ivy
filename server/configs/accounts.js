import {Meteor} from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { insertStatus } from '/lib/contactStatus.js';

// For environment variable when testing locally


  Accounts.onCreateUser(function(options, user) {
		const DEFAULT_FUNNEL_STATUS = "Contact";
    if (options.profile){
      user.profile = options.profile;
    }

		let userDoc = options;

    user.name=userDoc.name;

		if(!userDoc.phone){
			user.phone = "";
		}
		if(!userDoc.major){
			user.major = "";
		}
		if(!userDoc.howhear){
			user.howhear = "";
		}
		if(!userDoc.bio){
			user.bio = "";
		}
		if(!userDoc.ticket){
			user.ticket = "";
		}
		if(!userDoc.addresses){
			user.addresses = [];
		}
		if(!userDoc.affiliations){
			user.affiliations = [];
		}
		if(!userDoc.communitylife){
			user.communitylife = [];
		}
		if(!userDoc.funnelStatus){
			user.funnelStatus = DEFAULT_FUNNEL_STATUS;
			insertAndUpdateFunnelStatus(user._id, DEFAULT_FUNNEL_STATUS);
		} else {
			user.funnelStatus = userDoc.funnelStatus;
			insertAndUpdateFunnelStatus(user._id, userDoc.funnelStatus);
		}
		if(userDoc.newsletter === undefined){
			user.newsletter = false;
		}
		if(!userDoc.status){
			if(userDoc.isUser){
				user.status = "User";
				delete userDoc.isUser;
			}
			else{
				user.status = "Present";
			}
		}
		user.createdAt = new Date();

    // initialize user preferences
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
    //for data migration from Contacts & users
    // to just users
    //Contacts.update({_id: options.contactid},{$set:{user: true}});
    //user.contact = options.contactid;

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

//}
