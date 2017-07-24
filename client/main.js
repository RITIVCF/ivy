import { Accounts } from 'meteor/accounts-base';
// if(!Meteor.userId()){
//   console.log(FlowRouter.getRouteName());
//   console.log(FlowRouter.current());
//   FlowRouter.go("/login");
// }

document.title="Ivy";


//For testing
//Meteor.subscribe("allUsers");

Meteor.subscribe("allContacts");
Meteor.subscribe("oldContacts");
Meteor.subscribe("contact");
Meteor.subscribe("userSelf");
Meteor.subscribe("allGroups");
Meteor.subscribe("allCounters");
SiteOptions = Meteor.subscribe("allOptions");
Meteor.subscribe("allPagePermissions");
Meteor.subscribe("currentFunnel");
Meteor.subscribe("currentStatus");


routeTo = function(routeName, params){
	FlowRouter.go(FlowRouter.path(routeName, params));
}


Accounts.onEnrollmentLink(function(token,done){
  //Accounts.resetPassword()
  FlowRouter.go("/signup/"+token);
});

Accounts.onResetPasswordLink(function(token, done){
	FlowRouter.go("/forgotpassword/"+token);
});

if ($) {
  Vel = $.Velocity;
}
else {
  Vel = Velocity; // change value with jQuery.Velocity
}
