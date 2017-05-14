//import "./jobCollection.js";

function testThis(){
	console.log("Testing");
}

function getMyGroupsIDs(){
	var grps = Groups.find({users: this.userId}).fetch();
	console.log(grps);
	var ids = [];
	grps.forEach(function(group){
		ids.push(group._id);
	});
	return ids;
}

checkPermission = function(id,uid){
	//console.log(this.userId);
	var grps = Groups.find({users: uid}).fetch();
	var ids = [];
	grps.forEach(function(group){
		ids.push(group._id);
	});

	return PagePermissions.find({_id:id,groups: {$in: ids}}).fetch().length>0;
}
