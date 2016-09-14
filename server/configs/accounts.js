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
    Contacts.update({_id: options.contactid},{$set:{user: true}});
    user.contact = options.contactid;
    return user;
  });

  // Accounts.onEnrollmentLink(function(token,done){
  //   //Accounts.resetPassword()
  //   FlowRouter.go("/signup/"+token);
  // });

  Accounts.emailTemplates.sitename = "Ivy";
  Accounts.emailTemplates.from = "Ivy <no-reply@ivy.rit.edu>";
  Accounts.emailTemplates.enrollAccount.subject = function(user){
    return "Ivy Account Creation Email Confirmation";
  };
  Accounts.emailTemplates.enrollAccount.text = function(user, url){
    var name = Contacts.findOne(user.contact).name;
    return "Dear "+ name + "\n\nPlease follow the link below to set your password and create a username:\n\n"
    + "Confirmation link: " + url;
  };
  Accounts.emailTemplates.resetPassword.from = function(){
    return "Ivy Password Reset <no-reply@ivy.rit.edu>";
  }

//}
