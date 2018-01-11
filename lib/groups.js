
export {
	loadGroups,
	getDefaultEventGroups,
	addUserToPrayerGroup,
	removeUserFromPrayerGroup,
	removeGroup
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

function removeGroup(id){
	const hasEvents = (Events.find({groupId: id}).fetch().length > 0);
	if (hasEvents) {
		throw new Meteor.Error(100, 'Group cannot be removed.', 'The group is connected with at least one event and cannot be removed.');
	} else {
		Groups.remove(id);
		return true;
	}
}

function addUserToPrayerGroup({ uid }){
	Groups.update('prayergroup', {$addToSet: {users: uid}});
}

function removeUserFromPrayerGroup(uid){
	Groups.update('prayergroup', {$pull: {users: uid}});
}
