//import "./jobCollection.js";
import { getStatus, insertStatus, isStatusValid } from '/lib/contactStatus.js';
export {
	convertStatusArchitecture
}

if (Meteor.isDevelopment) {
	process.env.mail_url= Meteor.settings.mail_url;
}

function getMyGroupsIDs(){
	var grps = Groups.find({users: this.userId}).fetch();
	var ids = [];
	grps.forEach(function(group){
		ids.push(group._id);
	});
	return ids;
}

// checkPermission = function(id,uid){
// 	var grps = Groups.find({users: uid}).fetch();
// 	var ids = [];
// 	grps.forEach(function(group){
// 		ids.push(group._id);
// 	});
//
// 	return PagePermissions.find({_id:id,groups: {$in: ids}}).fetch().length>0;
// }


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
		if(checkPermission("admin")){
			convertStatusArchitecture();
		}
	}
});


function convertStatusArchitecture(){
	// This is a temp method to perform the algorithm to update all of the
	// status options from status to funnelStatus and adding status
	console.log("---------------------------");
	// Copy status to funnelStatus
	let users = Meteor.users.find().fetch();
	users.forEach( (user) => {
		console.log("User: ", user.name);
		let status = getStatus(user._id);
		console.log("Status: ", status);
		if(status){
			console.log("Status exists");
			if(isStatusValid(status)){
				console.log("Status is valid");
				// User is already converted,
				// check everything else to make sure it is set up
				let funnelStatus = getUserFunnelStatus(user._id);
				console.log("Funnel status: ", funnelStatus);
				if(funnelStatus){
					console.log("Funnel status exists.");
					Meteor.users.update(user._id,{$set: {funnelStatus: funnelStatus}});
				}
				else{
					console.log("Funnel status does not exist. Insert and update.");
					insertAndUpdateFunnelStatus(user._id, "Contact");
				}
			}
		}
		else {
			console.log("Status does not exist.");
			// Else continue
			let funnelStatus = getUserFunnelStatus(user._id);
			console.log("Funnel status: ", funnelStatus);
			if(funnelStatus){
				console.log("Funnel status exists.");
				Meteor.users.update(user._id,{$set: {funnelStatus: funnelStatus}});
			}
			else {
				console.log("Funnel status does not exist. Insert and update.");
				insertAndUpdateFunnelStatus(user._id, "Contact");
			}

			// Set all to Present. Will have to change the others manually.
			console.log("Insert default contact status");
			insertStatus(user._id, "Present");

		}
		console.log("---------------------------");

	});


}

fixStatusOptions = function(run){
	// arg: run - if true, actually does updates
	let users = Meteor.users.find().fetch();

	console.log("------------------------------------");
	users.forEach( (user) => {
		let funnelStatus = getUserFunnelStatus(user._id);
		if(funnelStatus){
			console.log("Funnel record exists");
			if(run){
				console.log("Update true. Updating...");
				Meteor.users.update(user._id, {$set: {funnelStatus: funnelStatus}});
			}
			console.log("User: ", user.name);
			console.log("Funnel: ", funnelStatus);
		}
		else{
			if(run){
				console.log("Update true. Inserting & updating...");
				insertAndUpdateFunnelStatus(user._id, "Contact");
			}
			console.log("Funnel record does not exist. Insert new one.");
			console.log("User: ", user.name);
			console.log("Funnel: Contact");
		}
		console.log("--------------------------------");
	});
}

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
