import {Meteor} from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
//export default () => {

// For environment variable when testing locally

if(Meteor.settings.MAIL_URL){
    process.env.MAIL_URL = Meteor.settings.MAIL_URL;
}


  Accounts.onCreateUser(function(options, user) {
    //let contact = this.getContact(redundantEmail)
    console.log(options);
    console.log(user);
    //user.email = options.contact.email;
    if (options.profile){
      user.profile = options.profile;
    }
    user.contact = options.contactid;
    return user;
  });

//}
