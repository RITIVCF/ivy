
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
	const perms = Options.findOne("defaulteventgroups").gids;
	return perms;
}
