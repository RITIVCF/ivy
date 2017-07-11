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
	var grps = Groups.find({$or: [{users: Meteor.userId()},{leader: Meteor.userId()}]}).fetch();
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


checkEventPermission = function(ev){
	if(Groups.find({_id:"admin", users: Meteor.userId()}).fetch().length==1){
		return {view: true, edit: true};
	}
  // if(!ev.permUser){
  //   return {"view":false,"edit": false};
  // }
	if(ev.owner==Meteor.userId()){
		return {view: true, edit: true}
	}
  var perm = false;// ev.perm[""]
	var view = false;
	for(i=0; i < ev.permUser.length; i++){
		if(ev.permUser[i].id == Meteor.userId()){
			view = true;
			perm = ev.permUser[i].edit;
			break;
		}
	}
	//console.log(ev.permGroup);
	for(i=0; i < ev.permGroup.length; i++){
		if(getUserGroupPermission().indexOf(ev.permGroup[i].id)>-1){
			//console.log("true");
			view = true;
			perm = ev.permGroup[i].edit||perm;
			break;
		}
	}
  return {"view": view,"edit": perm};
}
