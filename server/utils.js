import { setStatus } from '/lib/contactStatus.js';

export {
	runDbMigration
};

sendErrorEmail = function(subject, html){
	Email.send({
		to: "ivyritivcf@googlegroups.com",
		from: "no-reply@ivy.rit.edu",
		subject: "Error Notification: " + subject,
		html: html
	});
}


// This will run the Summer 2017 migration
function runDbMigration(){
	let log = "This is the log of the migration:<br><br>";

	log += setNewsletterToFalse();

	log += migrateUsers();

	log += migrateDebriefs();

	log += migrateEmails();

	log += migrateGroups();

	log += migrateEvents();

	log += migrateTickets();

	return log;

}


function setNewsletterToFalse(){
	let log = "<br>setNewsletterToFalse:<br>";
	// Where newsletter does not exist, add it
	let userCount = Meteor.users.find({newsletter: {$exists: false}}).fetch().length;
	Meteor.users.update(
		{newsletter: {$exists: false}},
		{$set: {newsletter: false}},
		{multi: true}
	);
	log += `Meteor.users.update(
		{newsletter: {$exists: false}},
		{$set: {newsletter: false}},
		{multi: true}
	);<br>`;
	let userCountAfter = Meteor.users.find({newsletter: {$exists: false}}).fetch().length;
	log += 'Users still without newsletter existing: ';
	if ( userCountAfter > 0 ) {
		log += userCountAfter.toString();
	}
	else {
		log += "None";
	}

	log += "<br>";
	return log;
}

function migrateUsers(){
	let log = "<br>migrateUsers:<br>";
	let users = Meteor.users.find().fetch();
	// Users of system, not contacts
	let ivyUsers = [
		"wzHMvSSsvXRz5n7iF",
		"4PoTrGGA2GYthCadG"
	];
	let graduatedContacts = [
		"RKaaXypwDyeNigoF4"
	];

	log += "users.forEach:<br>";
	users.forEach( (user) => {
		log += "--------------";
		log += "User: " + user.name + "<br>";
		if( user.deleted ) {
			log += "deleted: true<br>";
			if( ivyUsers.includes(user._id) ){
				log += "Is Tammy or Kate. Set as User.<br>";
				setStatus(user._id, "User");
			}
			else if ( graduatedContacts.includes(user._id) ) {
				log += "Is Alex. Mark as Graduated.<br>";
				Meteor.users.update(user._id, {$set: {funnelStatus: user.status}});
				setStatus(user._id, "Graduated");
			}
			else {
				log += "Is not Tammy or Kate. Set as Deleted.<br>";
				Meteor.users.update(user._id, {$set: {funnelStatus: user.status}});
				setStatus(user._id, "Deleted");
			}
		}
		else{
			// Convert funnel status
			// Initialize contact status
			log += "Is not deleted. Set funnel status to: "+ user.status +", and set as Present.<br>";
			Meteor.users.update(user._id, {$set: {funnelStatus: user.status}});
			setStatus(user._id, "Present");
		}
		log += "--------------";
	});

	// Remove the deleted field
	Meteor.users.update({},{$unset: {deleted: ""}},{multi: true});
	log += "Unset deleted field from everyone<br>";
	return log;
}

function migrateDebriefs(){
	// Remove all debrief draft
	let log = "<br>migrateDebriefs:<br>";
	Debriefs.remove({});
	log += "Debriefs.remove({});<br>";
	return log;
}

function migrateEmails(){
	// Since the defaults are handled in dbinit.js
	// Just blow everything away
	let log = "<br>migrateEmails:<br>";
	Emails.remove({});
	log += "Emails.remove({});<br>";
	return log;
}

function migrateGroups(){
	let log = "<br>migrateGroups<br>";
	let groups = Groups.find({}).fetch();

	groups.forEach( (group) => {
		log += "------------<br>";
		log += "Group: " + group.name + "<br>";
		log += "Has Leader: " + !!group.leader+"<br>";
		// COnvert to leader array
		if(!!group.leader){
			log += "Leader: " + group.leader+"<br>";
			Groups.update(group._id, {$set: {leader: [group.leader]}});
		}
	});
	return log;
}

function migrateEvents(){
	let log = "<br>migrateEvents<br>";
	// Send Alex the debrief content for manual updating
	let eventsWithDebriefs = Events.find({debrief: {$exists: true}}).fetch();
	let html = "";
	log += "Events w/ debriefs:<br>";
	eventsWithDebriefs.forEach( (event) => {
		log += "Name: " + event.name +"<br>";
		html += event.name + "<br><br>";
		html += "Notes:<br><br>";
		html += event.debrief.notes;
		html += "<br><br><br>";
	});
	Email.send({
		to: "awe6013@rit.edu",
		from: "no-reply@ivy.rit.edu",
		subject: "Event Debrief Content",
		html: html
	});
	log += "-----------<br>";

	// ****  Process all events  ******

	// Reset all debriefs
	Events.update({},{$set: {debrief: false}},{multi: true});

	// Set up event statuses
	let eventsWOStatus = Events.find({status: {$exists: false}}).fetch();
	log += "Events without status: " + eventsWOStatus.length.toString() +"<br>";
	eventsWOStatus.forEach( (event) => {
		log += "Name: " + event.name + "<br>";
	});
	Events.update({published: true}, {$set: {status: "Published"}},{multi:true});
	Events.update({published: false}, {$set: {status: "Unpublished"}},{multi:true});
	log += "Processsing event statuses";
	eventsWOStatus = Events.find({status: {$exists: false}}).fetch();
	log += "Events without status: " + eventsWOStatus.length.toString() +"<br>";
	eventsWOStatus.forEach( (event) => {
		log += "Name: " + event.name + "<br>";
	});

	return log;
}


function migrateTickets(){
	let log = "<br>migrateTickets<br>";
	let tickets = Tickets.find({deleted: {$exists: false}}).fetch();
	log += "Deleted does not exist count: " + tickets.length.toString();
	log += "<br>Tickets:<br>";
	tickets.forEach( (ticket) => {
		Tickets.update(ticket._id, {$set: {deleted: false}});
	});

	tickets = Tickets.find({deleted: {$exists: false}}).fetch();
	log += "Deleted does not exist count: " + tickets.length.toString();
	return log;
}
