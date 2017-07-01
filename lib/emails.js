import EmailModule from '/lib/classes/EmailModule.js';
import EmailContainer from '/lib/emails/components/EmailContainer.jsx';
import { getUsers, getUser } from '/lib/users.js';
//import EmailContainer from '/client/email/components/EmailContainer.jsx';

export {
	newEmail,
	updateEmailSubject,
	updateEmailTo,
	loadEmail,
	addUserEmailRecipient,
	addGroupEmailRecipient,
	addEmailEmailRecipient,
	stageNewsletter,
	unstageNewsletter,
	sendNewsletter,
	changeNewsletterSendDateTime,
	createNewEventFollowUpEmail,
	sendEventFollowUpEmail,
	buildHTML,
	setEmailHTML
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
	let emid = Emails.insert({
		uid: Meteor.userId(),
		to: recipient,
		from: from,   // email string
		subject: template.subject,
		modules: template.modules,
		when: new Date(),
		template: template._id,
		status: "draft"
	});
	return Emails.findOne(emid);
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

function setEmailStatus(emid, status){
	Emails.update(emid, {$set: {status: status}});
}

function stageNewsletter(emid){
	let email = Emails.findOne(emid);
	if(email.status == "draft"){
		setEmailStatus(emid, "staged");
		let job = newNewsletterJob(emid);
		scheduleJobAndSubmit(job, email.when);
	}
}

function unstageNewsletter(emid){
	let email = Emails.findOne(emid);
	if(email.status == "staged"){
		setEmailStatus(emid, "draft");
		removeJobCollectionJob({"data.emid": emid});
	}
}

function changeNewsletterSendDateTime(emid, newDateTime){
	let email = Emails.findOne(emid);
	if(email.status != "sent"){
		if(email.status == "staged"){
			// If staged, update job send date
			console.log("/Get job by data/");
			console.log("Emid: ", emid);
			let job = getJobCollectionJobByData({"data.emid": emid});
			console.log("Job: ", job);
			setNewJobAfterValue(job, newDateTime);
		}
		Emails.update(emid, {$set: {when: newDateTime}});
	}
}

function sendNewsletter(emid){
	let email = Emails.findOne(emid);
	let emailHTML = buildHTML(email);
	setEmailHTML(emid, emailHTML);
	let recipients = getUsers({newsletter: true});
	recipients.map( (recipient) => {
		Email.send({
      to: recipient.getEmail(),
      from: email.from,
      subject: email.subject,
      html: emailHTML
    });
	});
	setEmailStatus(emid, "sent");
}

function createNewEventFollowUpEmail(eid, uid){
	let job = newEventFollowUpEmailJob(eid, uid);
	let when = new moment().add(1, "day").hour(10).minute(0)._d;
	scheduleJobAndSubmit(job, when);
}

function sendEventFollowUpEmail(eid, uid){
	let event = Events.findOne(eid);

	let email = newEmail("eventfollowup", "ivcf.rit.edu", {});
	let emailHTML = buildHTML(email);

	let recipient = getUser(uid);

	// Send the email;
	Email.send({
		to: recipient.getEmail(),
		from: email.from,
		subject: "Welcome to InterVarsity!",
		html: emailHTML
	});
	setEmailStatus(emid, "sent");
}

function sendToDoEmail(emid){
	let email = loadEmail(emid);
	let emailHTML = buildHTML(email);
	let recipient = getUser(email.to.users[0]);

	Email.send({
		to: recipient.getEmail(),
		from: email.from,
		subject: email.subject,
		html: emailHTML
	});
	setEmailStatus(emid, "sent");
}

function buildHTML(email){
	let emailBuilder = new EmailContainer();
	return emailBuilder.renderHTML(email);
}

function setEmailHTML(emid, html){
	Emails.update(emid, {$set: {html: html}});
}
