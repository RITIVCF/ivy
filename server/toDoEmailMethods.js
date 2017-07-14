import { sendToDoEmail } from '/lib/emails.js';
import { getUser } from '/lib/users.js';
import { addActivity } from '/lib/tickets.js';

Meteor.methods({
	sendToDoEmail(recipientId, subject, message, ticketId){
		sendToDoEmail(recipientId, subject, message);

		addActivity(ticketId, "Email", subject, Meteor.userId());
	}
});
