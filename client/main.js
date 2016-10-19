import { Accounts } from 'meteor/accounts-base';
// if(!Meteor.userId()){
//   console.log(FlowRouter.getRouteName());
//   console.log(FlowRouter.current());
//   FlowRouter.go("/login");
// }

Meteor.subscribe("contact");
Meteor.subscribe("userSelf");

Accounts.onEnrollmentLink(function(token,done){
  //Accounts.resetPassword()
  FlowRouter.go("/signup/"+token);
});
