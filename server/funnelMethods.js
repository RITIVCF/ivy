calculateFunnelStatus = function(uid){
	console.log("<<calculateFunnelStatus>>");
  var threshold = getThreshold(); //Integer # of intervals
  let status = "Contact";
  let user = Meteor.users.findOne(uid);
  // Is user Multiplier
  if(Groups.find({_id: "multipliers", users: uid}).fetch().length>0){
    status = "Multiplier";
  }
  // Is user Leader
  else if (Groups.find({leader : uid}).fetch().length > 0) {
    status = "Leader"
  }
  // Is user Server
  else if (Groups.find({type : "Team", users : uid}).fetch().length > 0) {
    status = "Server";
  }
  // Is user Member
  else if (user.member) {
    status = "Member";
  }
  // Is user Visitor, Crowd, or Contact
  // Uses event attendance
  else {
    var count = getIntervalCounts(uid);
		console.log("Interval Countst: ", count);
		console.log("Threshold: ", threshold);
    if (count>=threshold) {
      status = "Visitor";
    }
    else if ((count >= 1)&&(count<threshold)){
      status = "Crowd";
    }
    else {
      status = "Contact";
    }
  }

  // After finding status, set status
  saveStatusChange(uid, status);
	return status;
}

getUserStatus = function(uid){
	console.log("<<getUserStatus>>");
	let funnelObj = Funnel.find({uid: uid}, {sort: {timestamp: -1}, limit: 1}).fetch()[0];
	return funnelObj ? funnelObj.status : false;
}

saveStatusChange = function(uid, status){
	console.log("<<saveStatusChange>>");
  // If current status
  let currStatus = getUserStatus(uid);

  if(currStatus){
    if(currStatus!=status){
      insertAndUpdateStatus(uid, status);
    }
  }
  else{
    insertAndUpdateStatus(uid, status);
  }

}

insertAndUpdateStatus = function(uid, status){
	Funnel.insert({uid: uid, status: status, timestamp: new Date()}, () => {
		Meteor.users.update({_id: uid}, {$set: {status: status}});
	});
}

getIntervals = function(){
	console.log("<<getIntervals>>");
	let options = getCalculationOptions();
	var intervalLength = options.interval; //In days
  var period = options.period; //In intervalLengths
  var endDate = new Date();
  var startDate = new Date();

  let intervals = [];

  for( var i=0; i < period; i++ ){
    // Move start date back
    var startDate = subtractMinutes(endDate, intervalLength);


    // Get count of events in this interval
    var numOfEventsInInterval = Events.find({
			start:{
				$gte : startDate,
				$lt : endDate
			},
      published: true,
		}, {name: 1}).count();

		// are there no events?
    if(numOfEventsInInterval==0){
      endDate = startDate;	// Move to next interval
      i--;									// Decrement count
      continue;							// Start again
    }

		// Build interval object & add to list
    var interval = {
      startDate: startDate,
      endDate: endDate
    };
    intervals.push(interval);
		console.log("Interval "+i+": ", interval);
    endDate = startDate;
  }
	return intervals;
}

getIntervalCounts = function(uid){
	console.log("<<getIntervalCounts>>");
  let intervals = getIntervals();
  var count = 0;
  intervals.forEach((intvl)=>{
    if(Events.find( {start: {$gte : intvl.startDate, $lt : intvl.endDate}, "attendees._id": uid } ).count() > 0){
      count++
    }
  });
  return count;
}

getNumberOfValidIntervals = function(numOfIntervals){
	console.log("<<getNumberOfValidIntervals>>");
	// Valid means there is at least one event in this intvl
	let intervalLength = getInterval();
  var endDate = new Date();
  var startDate = new Date();
	var numOfEventsInInterval = 0;

  let count = 0;

  for( var i=0; i < numOfIntervals; i++ ){
    // Move start date back
    startDate = subtractMinutes(endDate, intervalLength);
		console.log("Interval " + i + " start: ", startDate);
		console.log("Interval " + i + " end: ", endDate);
    // are there events in this interval?
    numOfEventsInInterval = Events.find({
			start:{
				$gte : startDate,
				$lt : endDate
			},
      published: true,
		}, {name: 1}).count();
		console.log("Number of events in interval "+ i +": ", numOfEventsInInterval);
    if(numOfEventsInInterval > 0){
			console.log("Number of events in interval is greater than 0. Increase number of valid intervals.");
      count++;
    }
		endDate = startDate;
  }
	return count;
}

setupStatusJobs = function(uid){
	console.log("<<setupStatusJobs>>");
  let job = getJobCollectionJobByUserId(uid);
	let threshold = getThreshold();

	let currentStatus = getUserStatus(uid);
	if(currentStatus == "Crowd"){
		let period = getPeriod();
		delayJobNumberOfIntervals(job, period - threshold);
	}
	else{
		delayJobNumberOfIntervals(job, threshold);
	}

}

populateFunnel = function(){
  Meteor.users.find().fetch().forEach((user)=>{
    Funnel.insert({uid: user._id, status: user.status, timestamp: new Date()});
  });
}

getCalculationOptions = function(){
	console.log("<<getCalculationOptions>>");
	return Options.findOne("funnelcalculation");
}

getThreshold = function(){
	console.log("<<getThreshold>>");
	return getCalculationOptions().threshold;
}

getPeriod = function(){
	console.log("<<getPeriod>>");
	return getCalculationOptions().period;
}

getInterval = function(){
	console.log("<<getInterval>>");
	return getCalculationOptions().interval;
}
