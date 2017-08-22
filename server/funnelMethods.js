import { isContactPresent } from '/lib/contactStatus.js';
import { getUser } from '/lib/users.js';
import Contact from '/lib/classes/Contact.js';

calculateFunnelStatus = function(uid){
  var threshold = getThreshold(); //Integer # of intervals
  let status = "Contact";
  let user = getUser(uid);

  // Is user Visitor, Crowd, or Contact
  // Uses event attendance
  var count = getIntervalCounts(uid);

  if (count>=threshold) {
    status = "Visitor";
  }
  else if ((count >= 1)&&(count<threshold)){
    status = "Crowd";
  }
  else {
    status = "Contact";
  }

	// If present, do not take attendance into consideration
	// for calculating funnel
	let currentStatus = user.getStatus();
	let funnelRecords = Funnel.find({uid: uid}).fetch();
	let statusRecords = Status.find({uid: uid}).fetch();
	if(!isContactPresent(currentStatus)){
		status = user.getFunnelStatus();
	}
	else{
		// Check to see if we need to follow up with them
	  checkIntegration(status, uid);
	}

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


  // After finding status, set status
  saveStatusChange(uid, status);
	return status;
}

getUserFunnelStatus = function(uid){
	let funnelObj = Funnel.find({uid: uid}, {sort: {timestamp: -1}, limit: 1}).fetch()[0];
	return funnelObj ? funnelObj.status : false;
}

saveStatusChange = function(uid, status){
  // If current status
  let currStatus = getUserFunnelStatus(uid);

  if(currStatus){
    if(currStatus!=status){
      insertAndUpdateFunnelStatus(uid, status);
    }
  }
  else{
    insertAndUpdateFunnelStatus(uid, status);
  }

}

insertAndUpdateFunnelStatus = function(uid, status){
	Funnel.insert({uid: uid, status: status, timestamp: new Date()}, () => {
		Meteor.users.update({_id: uid}, {$set: {funnelStatus: status}});
	});
}

getIntervals = function(){
	let options = getCalculationOptions();
	var intervalLength = options.interval; //In days
  var period = options.period; //In intervalLengths
  var endDate = new Date();
	// Add 2 hours because form opens 2 hours before event starts.
  var startDate = new moment().add(2, "hours");

  let intervals = [];

  for( var i=0; i < period; i++ ){
    // Move start date back
    var startDate = subtractDays(endDate, intervalLength);


    // Get count of events in this interval
    var numOfEventsInInterval = Events.find({
			start:{
				$gte : startDate,
				$lt : endDate
			},
      status: {$in: ["Published", "Reviewed"]},
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

    endDate = startDate;
  }
	return intervals;
}

getIntervalCounts = function(uid){
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
	// Valid means there is at least one event in this intvl
	let intervalLength = getInterval();
  var endDate = new Date();
  var startDate = new Date();
	var numOfEventsInInterval = 0;

  let count = 0;

  for( var i=0; i < numOfIntervals; i++ ){
    // Move start date back
    startDate = subtractDays(endDate, intervalLength);

    // are there events in this interval?
    numOfEventsInInterval = Events.find({
			start:{
				$gte : startDate,
				$lt : endDate
			},
      published: true,
		}, {name: 1}).count();

    if(numOfEventsInInterval > 0){
      count++;
    }
		endDate = startDate;
  }
	return count;
}

setupStatusJobs = function(uid){
  let job = getJobCollectionJobByUserId(uid);
	let threshold = getThreshold();

	let currentStatus = getUserFunnelStatus(uid);
	if(currentStatus == "Crowd"){
		let period = getPeriod();
		delayJobNumberOfIntervals(job, period - threshold);
	}
	else{
		delayJobNumberOfIntervals(job, threshold);
	}

}

populateFunnel = function(excludeIds){
	if(!excludeIds){
		excludeIds = [];
	}
  Meteor.users.find({_id: {$nin: excludeIds}}).fetch().forEach((user)=>{
    Funnel.insert({uid: user._id, status: user.status, timestamp: new Date()});
  });
}

getCalculationOptions = function(){
	return Options.findOne("funnelcalculation");
}

getThreshold = function(){
	return getCalculationOptions().threshold;
}

getPeriod = function(){

	return getCalculationOptions().period;
}

getInterval = function(){
	return getCalculationOptions().interval;
}

checkIntegration = function(status, uid){
  let curstatus = getUserFunnelStatus(uid);
  let nonIntegrated = ["Visitor", "Crowd", "Contact"];
  switch (curstatus) {
    case "Multiplier":
    case "Leader":
    case "Server":
    case "Member":
      if (nonIntegrated.includes(status)) {
        addIntegrationTicket(uid);
      }
      break;
    case "Visitor":
      if (status == "Crowd" || status == "Contact") {
        addIntegrationTicket(uid);
      }
      break;
    default:
      break;
  }


}

addIntegrationTicket = function(uid){
  ret = Counters.findOne("ticketID");
  Counters.update({_id:"ticketID"}, {$inc: {seq: 1}});
  let user = new Contact(Meteor.users.findOne(uid));
  let desc = user.getName()+" has not been coming for a while.\n"+user.getEmail()+"\n"+user.getPhone()+"\n"+user.getHowHear();
  let gid = Options.findOne("ticketcontact").gid;
  var tktId = Tickets.insert({
    ticketnum: ret.seq,
    subject: "See how " + user.getName() + " is doing!",
    description: desc,
    assignedgroup: gid,
    assigneduser: Groups.findOne(gid).leader[0],
    customer: uid,  // Affected, or "customer" user
    status: "Open",
    type:"Contact",
    evreqtype: "",
    eid: "",
    activities: [],
    createdAt: new Date(),
    submittedby: "Ivy System",
    lastUpdated: new Date()
  });
  // Sets huh?
  sendIntegrationNotification(tktId);
  return tktId;
}

sendIntegrationNotification = function(tktId) {
  let gid = Options.findOne("ticketcontact").gid;
  let group = Groups.findOne(gid);
  let leaders = [];
  let custId = Tickets.findOne(tktId).customer;
  let contact = new Contact(Meteor.users.findOne(custId));
  group.leader.forEach( (leaderId) => {
    let leader = new Contact(Meteor.users.findOne(leaderId));
    leaders.push(leader);
  });
  leaders.forEach( (leader) => {
    Email.send({
      to: leader.getEmail(),
      from: "Ivy Information System",
      subject: "New Integration Ticket For: " + contact.getName(),
      html: contact.getName()+" has not been coming for a while.<br>"+contact.getEmail()+"<br>"+contact.getPhone()+"<br>"+contact.getHowHear()+"<br><a href='http://ivy.rit.edu/tickets/"+tktId+"'>View the ticket here</a>"
    });
  });
}
