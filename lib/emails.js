import EmailModule from '/lib/classes/EmailModule.js';
import EmailContainer from '/lib/emails/components/EmailContainer.jsx';
import { getUsers, getUser } from '/lib/users.js';
import { setModuleDesc } from '/lib/modules.js';
import Email from '/lib/classes/Email.js';

let emailBuilder = new EmailContainer();

export {
	newEmail,
	updateEmailSubject,
	updateEmailTo,
	loadEmail,
	addUserEmailRecipient,
	setUserEmailRecipients,
	addGroupEmailRecipient,
	addEmailEmailRecipient,
	stageNewsletter,
	unstageNewsletter,
	sendNewsletter,
	changeNewsletterSendDateTime,
	createNewEventFollowUpEmail,
	sendEventFollowUpEmail,
	sendToDoEmail,
	buildHTML,
	setEmailHTML,
	sendToMe
}

function loadEmail(emid){
	let email = Emails.findOne(emid);
	email = new Email(email);

	let modules = email.modules;
	email.modules = [];

	modules.forEach( (module) => {
		email.modules.push(new EmailModule(module));
	});

	return email;
}

function newEmail(userId, templateId, from, recipient){
	/* Args:
						recip: {
							users: [userIds],
							groups: [gids],
							emails: ["emails"]
						}
	*/
	if(!recipient){
		recipient = {
			users: [],
			groups: [],
			emails: []
		};
	}
	var template = Emails.findOne(templateId);
	let emid = Emails.insert({
		uid: userId,
		to: recipient,
		from: from,   // email string
		subject: template.subject,
		modules: template.modules,
		when: new moment().second(0)._d,
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

function setUserEmailRecipients(emid, recipientArray){
	Emails.update(emid, {$set: {"to.users": recipientArray}});
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

function sendToMe(emid, uid=""){
	let email = Emails.findOne(emid);
	let emailHtml = buildHTML(email);
	console.log(emailHtml);
	sendEmail({
		to: getUser(uid).getEmail(),
		from: email.from,
		subject: email.subject,
		html: emailHtml
	});

}

function sendNewsletter(emid){
	let email = Emails.findOne(emid);

	// Build recipient list
	let recipients = getUsers({newsletter: true});
	let userIdList = [];
	recipients.map( (recipient) => {
		userIdList.push(recipient._id);
	});
	setUserEmailRecipients(emid, userIdList);

	// Send Email
	send(email._id);
}

function createNewEventFollowUpEmail(eid, uid){
	let job = newEventFollowUpEmailJob(eid, uid);
	let when = new moment().add(1, "day").hour(10).minute(0)._d;

	scheduleJobAndSubmit(job, when);
}

function sendEventFollowUpEmail(emid, uid){
	let event = Events.findOne(emid);

	let email = newEmail("Ivy System", "eventfollowup", "ivcf.rit.edu");

	addUserEmailRecipient(email._id, uid);
	// Set the all of the stuff

	// Send the email;
	send(email._id);
}

function sendToDoEmail(recipientId, subject, message){
	let sender = getUser(Meteor.userId());
	let recipients = {
		users: [recipientId],
		groups: [],
		emails: []
	};
	let email = newEmail(sender._id, "todoemail", sender.getEmail(), recipients);
	updateEmailSubject(email._id, subject);
	setModuleDesc(email._id, email.modules[0]._id, message);

	send(email._id);
}

function buildHTML(email, saluationString=""){
	return emailBuilder.renderHTML(email, saluationString);
}

function setEmailHTML(emid, html){
	Emails.update(emid, {$set: {html: html}});
}

function send(emid){
	let email = Emails.findOne(emid);
	if(!email){
		return;
	}
	// Send to users
	email.to.users.map( (userId) => {
		let user = getUser(userId);
		let emailHtml = buildHTML(email, user.getName());
		sendEmail({
			to: user.getEmail(),
			from: email.from,
			subject: email.subject,
			html: emailHtml
		});

	});

	// Send to groups
	email.to.groups.map( (groupId) => {
		let group = Groups.findOne(groupId);
		group.users.map( (userId)=>{
			let user = getUser(userId);
			let emailHtml = buildHTML(email, user.getName());
			sendEmail({
				to: user.getEmail(),
				from: email.from,
				subject: email.subject,
				html: emailHtml
			});

		});
	});

	// Send to emails
	email.to.emails.map( (emailAddress) =>{
		let emailHtml = buildHTML(email);
		sendEmail({
			to: emailAddress,
			from: email.from,
			subject: email.subject,
			html: emailHtml
		});

	});

	setEmailStatus(email._id, "sent");
}

function removeEmail(emid){
	let email = loadEmail(emid);

	if(!email.isSent()){
		if(email.isStaged()){
			removeJob({"data.emid": emid});
		}

		Emails.remove(emid);
	}
}
