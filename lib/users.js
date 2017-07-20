import Contact from '/lib/classes/Contact.js';

export {
	createNewUser,
	getUsers,
	getUser
}


function createNewUser(userDoc, isAdmin){
	/*
		Required fields in userDoc:
			name: "",
			email: ""
	*/
	if(!userDoc.phone){
		userDoc.phone = "";
	}
	if(!userDoc.major){
		userDoc.major = "";
	}
	if(!userDoc.howhear){
		userDoc.howhear = "";
	}
	if(!userDoc.bio){
		userDoc.bio = "";
	}
	if(!userDoc.ticket){
		userDoc.ticket = "";
	}
	if(!userDoc.addresses){
		userDoc.addresses = [];
	}
	if(!userDoc.affiliations){
		userDoc.affiliations = [];
	}
	if(!userDoc.communitylife){
		userDoc.communitylife = [];
	}
	if(!userDoc.funnelStatus){
		userDoc.funnelStatus = "Contact";
	}
	if(!userDoc.status){
		if(isAdmin){
			userDoc.status = "Admin";
		}
		else{
			userDoc.status = "Present";
		}
	}
	userDoc.createdAt = new Date();

	let newUserId = Accounts.createUser(userDoc);

	return newUserId;
}

function getUsers(query, options){
	if(!options){
		options = {};
	}
	if(!query){
		query = {};
	}
	let dbUsers = Meteor.users.find(query, options).fetch();
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

function exportUsersToCSV(users){
	var csvContent = "data:text/csv;charset=utf-8,";
	csvContent += "Name, Email, Phone, Newsletter, How Hear, Is Member, Status\n";

	users.forEach(function(user){
		 var dataString = "";
		 dataString += contact.getName() + "," + contact.getEmail() + "," + contact.getPhone()  + ",";
		 dataString += contact.isSignedUpForNewsletter() ? "Yes":"No";
		 dataString += ",";
		 dataString += contact.getHowHear() ? contact.getHowHear():"";
		 dataString += ",";
		 dataString += contact.isMember() ? "Yes":"No";
		 dataString += contact.getStatus()
		 dataString += "\n";
		 csvContent += dataString;
	 });

	 var encodedUri = encodeURI(csvContent);

	 var link = document.createElement("a");
	 link.setAttribute("href", encodedUri);
	 link.setAttribute("download", "All Contacts.csv");

	 document.body.appendChild(link); // Required for FF

	 link.click(); // This will download the data file named "my_data.csv".

}
