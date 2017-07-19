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

routeTo = function(routeName, params){
	FlowRouter.go(FlowRouter.path(routeName, params));
}

checkPermission = function(){
	// if(Groups.find({_id:"admin", users: Meteor.userId()}).fetch().length==1){
	// 	return true;
	// }
	var ids = [];
	//console.log(arguments);
	//console.log(arguments[0]);
	for (i = 0; i < arguments.length; i++) {
  	ids.push(arguments[i]);
  }
	var grps = Groups.find({users: Meteor.userId()}).fetch();
	var gids = [];
	grps.forEach(function(group){
		gids.push(group._id);
	});

	return PagePermissions.find({_id: {$in: ids },groups: {$in: gids}}).fetch().length>0;
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
