
export {
	addActivity,
	addTicketNote,
	setTicketStatus,
	deleteTicket
};


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
	Tickets.update(tid, {$set: {status: stat}});

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
