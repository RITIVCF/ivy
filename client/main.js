import { Accounts } from 'meteor/accounts-base';

document.title="Ivy";

//For testing
//Meteor.subscribe("allUsers");

Meteor.subscribe("allContacts");
Meteor.subscribe("userContacts");
Meteor.subscribe("graduatedContacts");
Meteor.subscribe("expiredContacts");
Meteor.subscribe("oldContacts");
Meteor.subscribe("contact");
Meteor.subscribe("userSelf");
Meteor.subscribe("allGroups");
Meteor.subscribe("allCounters");
SiteOptions = Meteor.subscribe("allOptions");
Meteor.subscribe("allPagePermissions");
Meteor.subscribe("currentFunnel");
Meteor.subscribe("currentStatus");


routeTo = function(routeName, params, queryParams){
	let path = FlowRouter.path(routeName, params, queryParams);
	FlowRouter.go(path);
}


Accounts.onEnrollmentLink(function(token,done){
  //Accounts.resetPassword()
  FlowRouter.go("/public/signup/"+token);
});

Accounts.onResetPasswordLink(function(token, done){
	FlowRouter.go("/public/forgotpassword/"+token);
});

if ($) {
  Vel = $.Velocity;
}
else {
  Vel = Velocity; // change value with jQuery.Velocity
}
