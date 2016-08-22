import {Meteor} from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';


export default () => {

  Accounts.onCreateUser(function(options, user) {
    let contact = this.getContact(redundantEmail);

    if(!contact ){
      var id = Meteor.call("newContact",
        "",
        emailVar,
        "",);

        user.contact = contact;
        return user;
    }

    user.contact = contact
    return user;
  });

}
