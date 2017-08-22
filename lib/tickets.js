
export {
	addTicket,
	addActivity,
	addTicketNote,
	setTicketStatus,
	deleteTicket
};


function addTicket(
			{subject="New Ticket", description="New Ticket", type="Other", requestType="", customer="", eid="", submittedBy="Ivy System"}
		){
	let nextID = Counters.findOne("ticketID");
	Counters.update({_id:"ticketID"}, {$inc: {seq: 1}});

	let assignedgroup = getTicketDefaultGroup(type, requestType);

	// Insert new and return new ID
	return Tickets.insert({
		ticketnum: nextID.seq,
		subject: subject,
		description: description,
		assignedgroup: assignedgroup,
		assigneduser: "",
		customer: customer,  // Affected, or "customer" user
		status: "Open",
		type: type,
		evreqtype: requestType,
		eid: eid,
		activities: [],
		deleted: false,
		createdAt: new Date(),
		submittedby: submittedBy,
		lastUpdated: new Date()
	});
}

function getTicketDefaultGroup(ticketType, requestType="") {
	switch (ticketType) {
		case "Contact":
			return Options.findOne("ticketcontact").gid;
		case "Event Request":
			return getRequestTypeDefaultGroup(requestType);
		case "Prayer":
		case "Other":
			return "";
	}
}

function getRequestTypeDefaultGroup(requestType){
	let requestTypes = Options.findOne("requesttypes");
	let gid = "";

	requestTypes.forEach( (type) => {
		if(type.label == requestType){
			gid = type.gid;
		}
	});

	return gid;
}

function addActivity( ticketId, type, desc, userId ){
	Tickets.update(ticketId,
		{$addToSet:
			{activities: 	newActivity(type, desc, userId)	}
		}
	);
}

function newActivity( type, desc, userId ){
	let newDesc = "";
	switch (type) {
		case "Note":
		case "Status":
		case "Email":
			newDesc = desc;
			break;
		default:
			newDesc = "";
	}
	let activity = {
		createdAt: new Date(),
		type: type,
		desc: newDesc,
		user: userId
	};

	return activity;
}


function addTicketNote(tid, note, userId){
	addActivity( tid, "Note", note, userId);
}

function setTicketStatus(tid, status, userId){
	Tickets.update(tid, {$set: {status: status}});

	let desc = "Status changed to " + status;
	addActivity( tid, "Status", desc, userId);
}

function deleteTicket(tid, reason="Reason not specified", deletedBy=""){
	reason = "Deleted: " + reason;
	if(!deletedBy){
		deletedBy = "Ivy System";
	}

	Tickets.update(tid, {$set: {deleted: true}});
	addActivity( tid, "Note", reason, deletedBy);
}
