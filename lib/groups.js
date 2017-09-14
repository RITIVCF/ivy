
export {
	loadGroups,
	getDefaultEventGroups
}

function loadGroups(query){
	return findGroups(query);
}

function findGroups(query){
	return Groups.find(query).fetch();
}

function getDefaultEventGroups(){
	console.log("I'm hitting it here");
	const perms = Options.findOne("defaulteventgroups").gids;
	console.log("perms: ", perms);
	return perms;
}
