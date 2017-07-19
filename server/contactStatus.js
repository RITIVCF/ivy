import { getUsers } from '/lib/users.js';
import { setStatus } from '/lib/contactStatus.js';

export {
	processExpiredContacts
}

function processExpiredContacts(){
	let users = Meteor.users.find(
		{
			status: {$in: [
				"Present"
			]}
		}
	).fetch();

	let testDate = subtractTime(new Date(), 1, "year");

	let events = [];
	users.forEach( (user) => {
		events = Events.find(
			{
				"attendees._id": user._id,
				"start": {$gte: testDate}
			}
		).fetch();

		if(events.length == 0){
			setStatus(user._id, "Expired");
		}
	});
}
