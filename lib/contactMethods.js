import { setStatus } from '/lib/contactStatus.js';

Meteor.methods({
	setContactStatus(uid, status){
		if(checkPermission("contactdetails")){
			setStatus(uid, status);
		}
	}
});
