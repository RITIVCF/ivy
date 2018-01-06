
export {
	loadGroups,
	getDefaultEventGroups,
	addUserToGroup,
	removeUserFromGroup,
	addUserToNewsletterMailingList,
	removeUserFromNewsletterMailingList,
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

function addUserToGroup({ gid, uid }) {
	const group = Groups.findOne(gid);

	if (!group) {
		throw "Invalid group ID provided";
	}

	Groups.update(gid,
		{$addToSet: {users: uid}}
	);

	if( Meteor.isServer && group.type != "Mailing List" ) {
		calculateFunnelStatus(uid);
	}

}

function removeUserFromGroup({ gid, uid }) {
	const group = Groups.findOne(gid);

	if (!group) {
		throw "Invalid group ID provided";
	}

	Groups.update(gid,
		{$pull: {users: uid}}
	);

	if( Meteor.isServer && group.type != "Mailing List" ) {
		calculateFunnelStatus(uid);
	}

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

function addUserToNewsletterMailingList(uid) {
	addUserToGroup({gid: "newsletter", uid: uid});
}

function removeUserFromNewsletterMailingList(uid) {
	removeUserFromGroup({gid: "newsletter", uid: uid});
}
