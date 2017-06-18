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

/*******     Format Date   **********/
formatDate = function(date){
	var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];
	var dayNames = [
		"Sunday", "Monday", "Tuesday",
		"Wednesday", "Thursday",
		"Friday", "Saturday"
	]
	var dt = new Date(date);
	var day = dt.getDay();
	var month = dt.getMonth();
	var date = dt.getDate();
	return dayNames[day] + ', ' + monthNames[month] + ' ' + date;
}
formatTime = function(date){
	var tm = new Date(date)
	var hour24 = tm.getHours();
	var min = tm.getMinutes().toString();
	console.log(min);
	if (min.length >= 2) {
		minutes = min;
	} else {
		minutes = new Array(2 - min.length + 1).join('0') + min;
	}
	if (hour24 > 12) {
		hour = hour24 % 12;
		hourTxt = " PM"
	} else {
		hour = hour24;
		hourTxt = " AM"
	}
	return hour + ':' + minutes + hourTxt;
}



/////////////////////////////////////

Meteor.methods({
	deleteContact(uid){
		Events.update({},{$pull: {"attendees": {_id: uid}}},{multi: true});
		Funnel.remove({uid:uid});
		Tickets.remove({customer: uid});
		Meteor.users.remove({_id: uid});
	}
});
