import EmailModule from '/lib/classes/EmailModule.js';

export {
	newEmail,
	updateEmailSubject,
	updateEmailTo,
	loadEmail,
	addUserEmailRecipient,
	addGroupEmailRecipient,
	addEmailEmailRecipient
}

function loadEmail(emid){
	let email = Emails.findOne(emid);

	let modules = email.modules;
	email.modules = [];
	
	modules.forEach( (module) => {
		email.modules.push(new EmailModule(module));
	});

	return email;
}

function newEmail(templateId, from, recipient){
	/* Args:
						recip: {
							users: [userIds],
							groups: [gids],
							emails: ["emails"]
						}
	*/
	var template = Emails.findOne(templateId);
	return Emails.insert({
		uid: Meteor.userId(),
		sent: false,
		to: recipient,
		from: from,   // email string
		subject: template.subject,
		modules: template.modules,
		sent: false,
		when: new moment().add(2,"hours")._d,
		template: template._id,
		staged: false
	});
}

function updateEmailSubject(emid, newSubject){
	Emails.update(emid, {$set: {subject: newSubject}});
}

function addUserEmailRecipient(emid, newRecipient){
	Emails.update(emid, {$addToSet: {"to.users": newRecipient}});
}

function addGroupEmailRecipient(emid, newRecipient){
	Emails.update(emid, {$addToSet: {"to.groups": newRecipient}});
}

function addEmailEmailRecipient(emid, newRecipient){
	Emails.update(emid, {$addToSet: {"to.emails": newRecipient}});
}
