//import "./jobCollection.js";

import '/server/startup/dbInitialize.js';

function getMyGroupsIDs(){
	var grps = Groups.find({users: this.userId}).fetch();
	var ids = [];
	grps.forEach(function(group){
		ids.push(group._id);
	});
	return ids;
}

checkPermission = function(id,uid){
	var grps = Groups.find({users: uid}).fetch();
	var ids = [];
	grps.forEach(function(group){
		ids.push(group._id);
	});

	return PagePermissions.find({_id:id,groups: {$in: ids}}).fetch().length>0;
}


Meteor.methods({
	setOptionsVals(id, vals){
		if(checkPermission("admin", Meteor.userId())){
			Options.update({_id: id}, {$set: {vals: vals}});
		}
	},
	setOptionsVal(id, val){
		if(checkPermission("admin", Meteor.userId())){
			Options.update({_id: id}, {$set: {vals: val}});
		}
	}
});
