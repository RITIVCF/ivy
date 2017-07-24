import { setStatus } from '/lib/contactStatus.js';

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
	makeAdmin(cid){
		if(checkPermission("admin")){
			setStatus(cid, "Admin");
		}
	},
	setContactStatus(uid, status){
		if(checkPermission("admin")){
			setStatus(uid, status);
		}
	},
	removeContact(uid){
		if(checkPermission("admin")){
			deleteUser(uid);
		}
	}
});
