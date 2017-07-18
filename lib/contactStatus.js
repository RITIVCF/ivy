
export {
	setStatus,
	isContactPresent
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


function setStatus(cid, status){
	if(isStatusValid(status)){
		Meteor.users.update(cid, {$set: {status: status}});
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
