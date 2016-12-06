import {Meteor} from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
//export default () => {

// For environment variable when testing locally


  Accounts.onCreateUser(function(options, user) {
    //let contact = this.getContact(redundantEmail)
    console.log(options);
    console.log(user);
    //user.email = options.contact.email;
    if (options.profile){
      user.profile = options.profile;
    }
    user.contact=options._id;
    user.name=options.name;
    user.phone=options.phone;
    user.major=options.major;
    user.howhear=options.howhear;
    user.bio="";
    user.ticket="";
    user.addresses=[];
    user.affiliations=[];
    user.communitylife=[];
    user.status="Crowd";
    user.createdAt=new Date();

    // initialize user preferences
    user.preferences={
      "theme-color": "Default",
      "contacts_view":"Tile",
      "contacts_infobar": true,
      "tickets_view":"List",
      "tickets_infobar":true,
      "events_infobar":true,
      "churches_view":"Tile",
      "churches_infobar":true
    };
    //for data migration from Contacts & users
    // to just users
    //Contacts.update({_id: options.contactid},{$set:{user: true}});
    //user.contact = options.contactid;
    return user;
  });

  Accounts.onEnrollmentLink= function(token,done){
    //Accounts.resetPassword()
    FlowRouter.go("/signup/"+token);
  };

  Accounts.emailTemplates.sitename = "Ivy";
  Accounts.emailTemplates.from = "Ivy <no-reply@ivy.rit.edu>";
  Accounts.emailTemplates.enrollAccount.subject = function(user){
    return "Ivy Account Creation Email Confirmation";
  };
  Accounts.emailTemplates.enrollAccount.text = function(user, url){
    //var name = Contacts.findOne(user.contact).name;
    var name = "name";
    return "Dear "+ name + "\n\nPlease follow the link below to set your password and create a username:\n\n"
    + "Confirmation link: " + url;
  };
  Accounts.emailTemplates.resetPassword.from = function(){
    return "Ivy Password Reset <no-reply@ivy.rit.edu>";
  }

//}
