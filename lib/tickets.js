
export {
	addActivity
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
