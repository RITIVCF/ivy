import {Meteor} from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';


//export default () => {

  Accounts.onCreateUser(function(options, user) {
    //let contact = this.getContact(redundantEmail)
    console.log(options);
    console.log(user);
    //user.email = options.contact.email;
    user.contact = options.contactid;
    return user;
  });

//}
