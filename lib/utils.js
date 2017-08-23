import { Email } from 'meteor/email';

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

dateFormat = function(date){
	return new moment(date.toISOString()).format("ddd MMM Do @ h:mm a");
}

setDocumentTitle = function(title){
	document.title = "Ivy - " + title;
}

checkPermission = function(){
	var ids = [];
	for (i = 0; i < arguments.length; i++) {
  	ids.push(arguments[i]);
  }
	var grps = Groups.find({$or: [{users: Meteor.userId()},{leader: Meteor.userId()}]}).fetch();
	var gids = [];
	grps.forEach(function(group){
		gids.push(group._id);
	});

	return PagePermissions.find({_id: {$in: ids },groups: {$in: gids}}).fetch().length>0;
}


sendEmail = function ( emailObj ){
	let shouldSend = true;

	// if ( process.env.NODE_ENV == "ivystaging" ) {
	// 	try {
	// 		emailObj.to = getUser(Meteor.userId()).getEmail();
	// 	} catch (e) {
	// 		shouldSend = false;
	// 	}
	//
	// }

	if ( shouldSend ) {
		Email.send(emailObj);
	}

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
