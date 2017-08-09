import { setStatus } from '/lib/contactStatus.js';
import { deleteUser } from '/lib/users.js';
import { getUser, createNewUser } from '/lib/users.js';
import { addTicket } from '/lib/tickets.js';

Meteor.methods({
	createNewContact(userDoc){
		// Create follow up ticket
		let addedBy = userDoc.name;
		if(Meteor.userId()){
			addedBy = getUser(Meteor.userId()).name;
		}
		let desc = "Added manually by " + addedBy + ".";
		let ticketID = addTicket({
			subject: "New Contact: " + userDoc.name,
			description: desc,
			type: "Contact",
			submittedBy: Meteor.userId()
		});
		userDoc.ticket = ticketID;

		let uid = createNewUser(userDoc);

		if(userDoc.newsletter){
			Meteor.call("updateNewsletter", uid, true);
		}
		if(userDoc.learnmore){
			Meteor.call("addLearnMoreTicket", uid);
		}

		return uid;
	},
	makePresent(cid){
		if(checkPermission("admin")){
			setStatus(cid, "Present");
		}
	},
	makeAbsent(cid){
		if(checkPermission("admin")){
			setStatus(cid, "Absent");
		}
	},
	makeGraduated(cid){
		if(checkPermission("admin")){
			setStatus(cid, "Graduated");
		}
	},
	makeOutOfScope(cid){
		if(checkPermission("admin")){
			setStatus(cid, "Out of Scope");
		}
	},
	makeUser(cid){
		if(checkPermission("admin")){
			setStatus(cid, "User");
		}
	},
	setContactStatus(uid, status){
		if(checkPermission("admin")){
			setStatus(uid, status);
		}
	},
	removeContact(uid){
		if(checkPermission("admin")){
			deleteUser( uid, Meteor.userId() );
		}
	}
});
