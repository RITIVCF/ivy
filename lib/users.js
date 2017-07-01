export {
	getUsers,
	getUser
}


function getUsers(query){
	let dbUsers = Meteor.users.find(query).fetch();
	let users = [];
	let user = {};
	dbUsers.map( (dbuser) => {
		user = buildUser(dbuser);
		users.push(user);
	});
	return users;
}

function getUser(query){
	let dbUser = Meteor.users.findOne(query);
	return buildUser(dbUser);
}

function getUserById(uid){
	let dbUser = Meteor.users.findOne(uid);
	return buildUser(dbUser);
}

function buildUser(userObj){
	return new Contact(userObj);
}
