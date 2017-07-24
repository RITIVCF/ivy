import { getUser } from '/lib/users.js';

export {
	setStatus,
	isContactPresent,
	shouldCalculateFunnel,
	expireContact,
	getStatus,
	insertStatus,
	isStatusValid
}

function isStatusValid(status){
	let validStatuses = [
		"Present",
		"Absent",
		"Graduated",
		"Expired",
		"Out of Scope",
		"Deleted",
		"Admin"
	];
	return validStatuses.includes(status);
}

function shouldCalculateFunnel(uid){
	let user = Meteor.users.findOne(uid);

	if(user){
		switch (user.status) {
			case "Out of Scope":
			case "Graduated":
			case "Deleted":
			case "Admin":
				return false;
			default:
				return true;
		}

	} else {
		return false;
	}

}


function setStatus(cid, status){
	if(isStatusValid(status)){
		if(status == "Admin"){
			Groups.update("admin", {$addToSet: {users: cid}});
		}
		else{
			Groups.update("admin", {$pull: {users: cid}});
		}

		updateStatus(cid, status);

		return true;
	}
	return false;
}

function isContactPresent(status){
	if(isStatusValid){
		if(status=="Present"){
			return true;
		}
		return false;
	}
	return false;
}

function expireContact(uid) {

	setStatus(uid, "Expired");
}


function updateStatus(uid, newStatus){
	let currStatus = getStatus(uid);
	if (currStatus) {
		if ( currStatus != newStatus ) {
			insertStatus(uid, newStatus);
		}
	} else {
		// Does not exist. Insert the first.
		insertStatus(uid, newStatus);
	}
}

function getStatus(uid){
	let record = Status.find({uid: uid}, {$limit: 1, $sort: {timestamp: -1}}).fetch()[0];
	return record ? record.status : false;
}

function insertStatus(uid, newStatus){
	let statusRecord = getDefaultStatusRecord();
	statusRecord.uid = uid;
	statusRecord.status = newStatus;

	Status.insert(statusRecord, () => {
		// Needs to be included to trigger client reactivity
		Meteor.users.update({_id: uid}, {$set: {status: newStatus}});
	});

}


function getDefaultStatusRecord() {
	return {
		uid: "",
		status: "Present",
		timestamp: new Date()
	};
}
