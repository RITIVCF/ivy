import { setStatus } from '/lib/contactStatus.js';
import { deleteUser } from '/lib/users.js';

Meteor.methods({
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
