ivyDate = function ivyDate() {

}

/*******     Subtract Time    **********/
subtractTime = function(date, number, timeUnit){
	if(!timeUnit){
		timeUnit = "days";
	}
	return new moment(date.toISOString()).subtract(number, timeUnit)._d;
}

subtractDays = function(date, number){
	return subtractTime(date, number, "days");
}

subtractMinutes = function(date, number){
	return subtractTime(date, number, "minutes");
}
//////////////////////////////////////

/*******     Add Time    **********/
addTime = function(date, number, timeUnit){
	if(!timeUnit){
		timeUnit = "days";
	}
	return new moment(date.toISOString()).add(number, timeUnit)._d;
}

addDays = function(date, number){
	return addTime(date, number, "days");
}

addMinutes = function(date, number){
	return addTime(date, number, "minutes");
}
//////////////////////////////////////

Meteor.methods({
	deleteContact(uid){
		Events.update({},{$pull: {"attendees": {_id: uid}}},{multi: true});
		Funnel.remove({uid:uid});
		Tickets.remove({customer: uid});
		Meteor.users.remove({_id: uid});
	}
});
