import {Meteor} from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
//export default () => {

// For environment variable when testing locally
process.env.MAIL_URL = 'smtp://ritivcf:JesusLovesYou247@smtp.gmail.com:465/';

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
