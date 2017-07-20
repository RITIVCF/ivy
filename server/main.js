//import "./jobCollection.js";

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
			Options.update({_id: id}, {$set: {val: val}});
		}
	},
	groupLeaderToArray(){
		let groups = Groups.find().fetch();
		groups.forEach( (group) => {
			if(group.leader){
				let leader = [group.leader];
				Groups.update(group._id, {$set: {leader: leader}});
			}
		});
	},
	configureStatusOptions(){
		// This is a temp method to perform the algorithm to update all of the
		// status options from status to funnelStatus and adding status

		// Copy status to funnelStatus
		let users = Meteor.users.find().fetch();
		users.forEach( (user) => {
			Meteor.users.update(user._id,{$set: {funnelStatus: user.status}});
		});

		// Set all to Present. Will have to change the others later.
		Meteor.users.update({}, {$set: {status: "Present"}});

	}
});




Array.prototype.move = function (old_index, new_index) {
	if (new_index >= this.length) {
		var k = new_index - this.length;
		while ((k--) + 1) {
				this.push(undefined);
		}
	}
	this.splice(new_index, 0, this.splice(old_index, 1)[0]);
	return this; // for testing purposes
};
