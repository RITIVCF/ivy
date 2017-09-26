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

Meteor.call("getRootURL", (error, ROOT_URL) => {
	if (error) {
		console.error("Could not get root url");
	} else {
		process.env.ROOT_URL = ROOT_URL;
	}

})


window.addEventListener('error', function (e) {
	console.log("Exception", e);
  var error = e.error;
	console.log(error);
  Meteor.call("sendErrorEmail", error.message, error.stack);
	Materialize.toast("Something went wrong. Please refresh the page and try again. If the issue persists, please report it via Ivy Feedback.<br>Thank you<br>- Ivy Development Team", 5000);
});
