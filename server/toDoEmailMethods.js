import { newEmail, sendToDoEmail } from '/lib/emails.js';
import { setModuleDesc } from '/lib/modules.js';
import { getUser } from '/lib/users.js';

Meteor.methods({
	newToDoEmail(recipientId, subject, message){
		let user = getUser(Meteor.userId());
		let recipients = {
			users: [recipientId],
			groups: [],
			emails: []
		};
		let email = newEmail('todoemail', user.getEmail(), recipients);
		updateEmailSubject(email._id, subject);
		setModuleDesc(email._id, email.modules[0]._id, message);
		sendToDoEmail(email._id);
		return email;
	},
	sendToDoEmail(emid){
		sendToDoEmail(emid);
	}
});
