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

	setNewsletterToFalse();

	migrateUsers();

	migrateDebriefs();

	migrateEmails();

	migrateGroups();

	migrateEvents();

	migrateTickets();

}


function setNewsletterToFalse(){
	// Where newsletter does not exist, add it
	Meteor.users.update(
		{newsletter: {$exists: false}},
		{$set: {newsletter: false}},
		{multi: true}
	);
}

function migrateUsers(){
	let users = Meteor.users.find().fetch();
	// Users of system, not contacts
	let ivyUsers = [
		"wzHMvSSsvXRz5n7iF",
		"4PoTrGGA2GYthCadG"
	];

	users.forEach( (user) => {
		if( user.deleted ) {
			if( ivyUsers.includes(user._id) ){
				setStatus(user._id, "User");
			}
			else {
				setStatus(user._id, "Deleted");
			}
		}
		else{
			// Convert funnel status
			// Initialize contact status
			Meteor.users.update(user._id, {$set: {funnelStatus: user.status}});
			setStatus(user._id, "Present");
		}
	});

	// Remove the deleted field
	Meteoer.users.update({},{$unset: {deleted: ""}},{multi: true});
}

function migrateDebriefs(){
	// Remove all debrief drafts
	Debriefs.remove({});
}

function migrateEmails(){
	// Since the defaults are handled in dbinit.js
	// Just blow everything away
	Emails.remove({});
}

function migrateGroups(){
	let groups = Groups.find({}).fetch();

	groups.forEach( (group) => {
		// COnvert to leader array
		if(group.leader){
			Groups.update(group._id, {$set: {leader: [group.leader]}});
		}
	});
}

function migrateEvents(){

	// Send Alex the debrief content for manual updating
	let eventsWithDebriefs = Events.find({debrief: {$exists: true}}).fetch();
	let html = "";
	eventsWithDebriefs.forEach( (event) => {
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

	// ****  Process all events  ******

	// Reset all debriefs
	Events.update({},{$set: {debrief: false}},{multi: true});

	// Set up event statuses
	let events = Events.find().fetch();

	events.forEach( (event) => {
		// Is event Published?
		if(event.published){
			Events.update(event._id, {$set: {status: "Published"}});
		}
		else{
			Events.update(event._id, {$set: {status: "Unpublished"}});
		}

	});

}


function migrateTickets(){
	let tickets = Tickets.find({deleted: {$exists: false}}).fetch();

	tickets.forEach( (ticket) => {
		Tickets.update(ticket._id, {$set: {deleted: false}});
	});
}
