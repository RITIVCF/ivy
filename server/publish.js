import { getUser } from '/lib/users.js';

ContactsBackup = new Mongo.Collection("contactsbackup");
EventsAttendanceBackup = new Mongo.Collection("eventsattendancebackup");

Meteor.publish("allEvents", function(){
  return Events.find({deleted: {$ne: true}});
});

Meteor.publish("summaryEvents", function(){

});

Meteor.publish("myAttendedEvents", function(){
  return Events.find({"attendees._id": this.userId, deleted: {$ne: true}});
});

Meteor.publish("ownerEvents", function(){
  return Events.find({owner: this.userId, deleted: {$ne: true}});
});

Contacts.allow({update: function(){return true;}});
Counters.allow({update: function(){return true;}});
Tickets.allow({insert: function(){return true;}});

Meteor.publish("thisEvent", function(evid){
  return Events.find({_id: evid});
});

Meteor.publish("Event", function(eid){
  const options = {
    fields: {
      _id: 1,
      name: 1,
      start: 1,
      end: 1
    }
  }
  return Events.find({_id:eid},options);
});

Meteor.publish("EventAttendees", function(){
  return Events.find({deleted: {$ne: true}},{fields: {name:1, attendees: 1, start: 1}});
});

Meteor.publish("mySchedule", function(){
  return Events.find({
    "jobs.uid": this.userId,
    end: {$gte: new Date()},
    "jobs.status": {$ne: "Declined"},
    deleted: {$ne: true}});
});

Meteor.publish("UpcomingEvents", function(){
  var twoweeks = new moment(new Date().toISOString()).add(2,"weeks")._d;
  return Events.find({status: "Published", start: {$gte: new Date(),$lte: twoweeks}, deleted: {$ne: true}},{limit: 3});
});

Meteor.publish("AttendedEvents", function(){
  return Events.find({
    "attendees._id":this.userId,
    start: {$lt: new Date()},
    deleted: {$ne: true}
  }, {sort: {start: -1},limit: 3});
});

Meteor.publish("myEvents", function(){
  var grps = Groups.find({users: this.userId}).fetch();
	var ids = [];
	grps.forEach(function(group){
		ids.push(group._id);
	});
	return Events.find({$or: [
    {owner: this.userId},
    {status: {$in: ["Published", "Reviewed"]}},
    {"permUser.id": this.userId},
    {"permGroup.id": {$in: ids}}
  ], deleted: {$ne: true}});
});

Meteor.publish("otherUnpublishedEvents", function(){
  var options = {fields: {start: 1, end:1, status: 1, permUser: 1, permGroup: 1,owner: 1, tags: 1}};
  if(Groups.find({_id:"admin", users: this.userId}).fetch().length==1){
		options = {};
	}
    return Events.find({deleted: {$ne: true}}, options);
});

// all published events, plus my unpublished events

Meteor.publish("publishedEvents", function(){
  return Events.find({status: {$in: ["Published", "Reviewed"]}, deleted: {$ne: true}});
});

Meteor.publish("pastEvents", function(lim){
  if(lim == 0){
    return Events.find({
      status: "Published",
      start: {$lt: new moment(new Date().toISOString()).add(2, "hours")._d},
      deleted: {$ne: true}
    },{sort: {start:-1} // Sorts descending chronologically by start
    });
  }
  return Events.find({
    status: "Published",
    start: {$lt: new moment(new Date().toISOString()).add(2, "hours")._d},
    deleted: {$ne: true}},{
    sort: {start:-1}, // Sorts descending chronologically by start
    limit: lim    // limits the number of events to publish until told to publish more
  });
})

Meteor.publish("debriefs", function(num){
  return Events.find(
    {debrief: {$exists: true}},
    {sort: {start: -1},limit: num}
  );
});

Meteor.publish("needDebrief", function(){
  return Events.find({
    start: {$lte: new Date()},
    debrief: {$exists: false}
  });
});

Meteor.publish("thisDebrief", function(eid){
  return Events.find({_id: eid});
});

Meteor.publish("oneEvent", function(eid){
  return Events.findOne(eid);
});

Meteor.publish("contactEvents", function(cid){
  return Events.find({"attendees._id": cid},{fields:{name: 1, start:1, end:1}});
});

Meteor.publish("allPagePermissions", function(){
  return PagePermissions.find();
});

Meteor.publish("allGroups", function(){
  return Groups.find();
});

Meteor.publish("contactGroups", function(){
  return Groups.find({admingroup: false});
});

Meteor.publish("adminGroups", function(){
  return Groups.find({admingroup: true});
});

Meteor.publish("Structures", function(){
  return Groups.find({});
});

Meteor.publish("MyGroups", function(){
  return Groups.find({users: this.userId}, {fields:{name:1, users:1}});
});

Meteor.publish("SGs", function(){
  return Groups.find({type: "Small Group"});
});

Meteor.publish("MySG", function(){
  return Groups.find({users: this.userId,type:"Small Group"});
});

Meteor.publish("allChurches", function(){
  return Churches.find({deleted: false});
});

Meteor.publish("activeChurches", function(){
  return Churches.find({active: true});
});

/*  Contact functions*/
Meteor.publish("contact", function(cid){
  if(!cid){
    try{
      cid = this.userId;
    }
    catch (error){
      cid = "";
    }
  }

  const selector = {
    _id: cid
  };

  const options = {
    fields: {
    name: 1,
    addresses: 1,
    email: 1,
    emails: 1,
    phone: 1,
    newsletter: 1,
    gender: 1,
    affiliations: 1,
    communitylife: 1,
    intl: 1,
    ethn: 1,
    major: 1,
    ticket: 1,
    bio: 1,
    ethnicity: 1,
    gradterm: 1,
    curryear: 1,
    member: 1,
		funnelStatus: 1,
		status: 1
     }
  };
  return Meteor.users.find(selector, options);
});

Meteor.publish("graduatedContacts", function(){
	let selector = {
		status: "Graduated"
	};
	return Meteor.users.find(selector);
});

Meteor.publish("expiredContacts", function(){
	let selector = {
		status: "Expired"
	};
	return Meteor.users.find(selector);
});

Meteor.publish("outofscopeContacts", function(){
	let selector = {
		status: "Out of Scope"
	};
	return Meteor.users.find(selector);
});

Meteor.publish("userContacts", function(){
	let selector = {
		status: "User"
	};
	let options = {
		fields: {
			name: 1,
			email: 1
		}
	};
	return Meteor.users.find(selector);
})

Meteor.publish("allContacts", function(filtr, srt){

  var selector = {status: {$nin: [
		"User",
		"Out of Scope",
		"Expired",
		"Graduated",
		"Deleted"
	]}};

  var options = {
    fields: {
    name: 1,
    addresses: 1,
    contact: 1,
    email: 1,
    emails: 1,
    phone: 1,
    major: 1,
    newsletter: 1,
    gender: 1,
    affiliations: 1,
    communitylife: 1,
    ticket: 1,
    intl: 1,
    howhear: 1,
    ethn: 1,
    ethnicity: 1,
    gradterm: 1,
    curryear: 1,
    member: 1,
    status: 1,
		funnelStatus: 1,
    user: 1,
    createdAt: 1
  },
  sort: {name: 1}
};

  if(srt == "Status"){
    options = {
      fields: {
      name: 1,
      addresses: 1,
      contact: 1,
      email: 1,
      phone: 1,
      newsletter: 1,
      gender: 1,
      affiliations: 1,
      communitylife: 1,
      intl: 1,
      ticket:1,
      ethn: 1,
      ethnicity: 1,
      gradterm: 1,
      curryear: 1,
      member: 1,
			funnelStatus: 1
    },
    sort: {
      member: 1,
      name: 1
    }
  };
  }
  return Meteor.users.find(selector, options);
});

Meteor.publish("oldContacts", function(filtr, srt){
  var selector = {deleted: true};

  var options = {
      fields: {
        name: 1,
        deleted: 1,
        addresses: 1,
        contact: 1,
        email: 1,
        emails: 1,
        phone: 1,
        major: 1,
        newsletter: 1,
        gender: 1,
        affiliations: 1,
        communitylife: 1,
        ticket: 1,
        intl: 1,
        howhear: 1,
        ethn: 1,
        ethnicity: 1,
        gradterm: 1,
        curryear: 1,
        member: 1,
        status: 1,
        user: 1,
        createdAt: 1
      },
      sort: {name: 1}
    };
  return Meteor.users.find(selector, options);
});

Meteor.publish("publicContacts", function(num){
  // This publish is for the public submittedby

  var selector = {deleted: {$ne: true}};
  var options = {
    fields: {
      name: 1,
      emails: 1,
      phone: 1,
      createdAt: 1
    },
    sort: {name: 1}
  };
  return Meteor.users.find(selector, options);
})

Meteor.publish("contactNames", function(){
  return [
    Contacts.find({}, {fields: {name:1}}),
    Meteor.users.find({},{fields: {contact: 1}})
  ];
});

Meteor.publish("duplicateContacts", function(){
  var result = Meteor.users.aggregate(     {"$group" : { "_id": "$name", "count": { "$sum": 1 }, ids: {$push: "$_id"}} },
    {"$match": {"_id" :{ "$ne" : null } , "count" : {"$gt": 1} } } );
  var ids =[];
    for(var i=0;i<result.length;i++){
      for(var y=0;y<result[i].ids.length;y++){
        ids.push(result[i].ids[y]);
      }
    }

    result = Meteor.users.aggregate(     {"$group" : { "_id": "$email", "count": { "$sum": 1 }, ids: {$push: "$_id"}} },
      {"$match": {"_id" :{ "$ne" : null } , "count" : {"$gt": 1} } } );
      for(var i=0;i<result.length;i++){
        for(var y=0;y<result[i].ids.length;y++){
          ids.push(result[i].ids[y]);
        }
      }
    return Meteor.users.find({_id: {$in: ids}});
});

Meteor.publish("thisContact", function(){
  var user = {contact:""};
  if(this.userId) {
        user = Meteor.users.findOne(this.userId);
        //var user is the same info as would be given in Meteor.user();
    }
  return Contacts.find({_id : user.contact});
});

Meteor.publish("userSelf", function(){

    const selector = {
      _id: this.userId
    };

  const options = {
    fields: {
    createdAt: 1,
    name:1,
    contact: 1,
    preferences: 1,
    bio: 1,
    phone: 1,
    howhear: 1,
    ticket: 1,
    addresses: 1,
    affiliations: 1,
    communitylife: 1,
    status: 1,
    newsletter: 1,
    major: 1,
    intl:1,
    gender: 1,
    ethn: 1,
    gradterm: 1,
    curryear: 1,
    member: 1,
    memberAt: 1,
    deleted: 1
     }
  };
  return Meteor.users.find(selector, options);
});

Meteor.publish("allActiveUsers", function(){

  const options = {
    fields: {
    name: 1,
    addresses: 1,
    contact: 1,
    email: 1,
    emails: 1,
    phone: 1,
    newsletter: 1,
    gender: 1,
    affiliations: 1,
    communitylife: 1,
    intl: 1,
    ethn: 1,
    ethnicity: 1,
    gradterm: 1,
    curryear: 1,
    member: 1
     }
   }
  return Meteor.users.find({deleted:{$ne: true}}, options);
});

Meteor.publish("allInactiveUsers", function(){

  const options = {
    fields: {
    name: 1,
    addresses: 1,
    contact: 1,
    email: 1,
    emails: 1,
    phone: 1,
    newsletter: 1,
    gender: 1,
    affiliations: 1,
    communitylife: 1,
    intl: 1,
    ethn: 1,
    ethnicity: 1,
    gradterm: 1,
    curryear: 1,
    member: 1
     }
   }
  return Meteor.users.find({deleted: true}, options);
});

Meteor.publish("allUsersEverything", function(){
  return Meteor.users.find();
});

/* Ticket Functions */
Meteor.publish("allActiveTickets", function(){
  const selector = Groups.find({_id:"admin",users: this.userId}).fetch().length==1?{
    $and: [
			{deleted: false},
      {status: {$ne: "Closed"}},
      {status: {$ne: "Canceled"}}
    ]
  }:{
    $and: [
			{deleted: false},
      {status: {$ne: "Closed"}},
      {status: {$ne: "Canceled"}},
      {type: {$ne: "Feedback"}}
    ]
  }
  return Tickets.find(selector,{sort:{ticketnum: 1}});
});

Meteor.publish("allTickets", function(){
  return Tickets.find();
});

Meteor.publish("eventTickets", function(evid){
  return Tickets.find({eid: evid,type:"Event Request"});
});

Meteor.publish("MyTickets", function(){
  var grps = Groups.find({users: this.userId}).fetch();

	var ids = [];
	grps.forEach(function(group){
		ids.push(group._id);
	});

  return Tickets.find(
    {$and:[
      {status: {$nin: ["Cancelled","Closed","Canceled"]}},
      {$or: [
        {assigneduser: this.userId},
        {assigneduser:"", assignedgroup: {$in: ids}},
        {submittedby: this.userId}
      ]}
    ]}
  );
});

Meteor.publish("allTicketStatus", function(){
  return Tickets.find({},{fields:{status: 1, assigneduser: 1}});
});

Meteor.publish("thisTicket", function(tid){
  var ticket = Tickets.findOne(tid);
	let customer = {ticket: ""};
	if(ticket.customer){
		customer = getUser(ticket.customer);
	}

  return [
		Tickets.find({_id: {$in: [tid, customer.ticket]}}),
		Events.find({_id:ticket.eid}),
		Meteor.users.find()
	];
});

Meteor.publish("ticket", function(cid){
  if(!cid){
    return;
  }
  var contact = Meteor.users.findOne(cid);
  return Tickets.find({_id: contact.ticket});
});

Meteor.publish("allOptions", function(){
  return Options.find();
});

Meteor.publish("allFeedback", function(){
  return Feedback.find();
});

Meteor.publish("uncompletedFeedback", function(){
  return Feedback.find({completed: false});
});

// ******    Email Section   **********

Meteor.publish("myEmails", function(){
  return Emails.find({$or:[{uid: this.userId},{isTemplate: true}]});
});

Meteor.publish("thisEmail", function(emid){
  return Emails.find({_id: emid});
});

Meteor.publish("emailEvents", function() {
  //let n = addDays(new Date(), 7);
  return Events.find(
		{$and: [{
			$or:[
		    {start: {$gt: new Date()}, status: "Published"},
		    {start: {$gt: new Date()}, tags: "Conference"}
		  ]},
			{$or: [
				{deleted: false},
				{deleted: {$exists: false}}
			]}
		]
		}
	);
});

//***************************************

// *******    Debrief   ************
Meteor.publish("myDebriefDrafts", function(){
  return Debriefs.find({uid: this.userId});
});

Meteor.publish("allDebriefQuestions", function(){
	return DebriefQuestions.find();
});
// *********************************

Meteor.publish("allCounters", function(){
  return Counters.find();
});

Meteor.publish("publicOptions", function(){
  return Options.find({$or:[
    {_id:"lgweeksahead"},
    {_id:"prayerweeksahead"},
    {_id: "gradterms"},
    {_id: "campusaffiliations"},
    {_id: "communitylife"},
    {_id: "ethnicities"},
    {_id: "ticketcontact"}
  ]});
});

Meteor.publish("currentFunnel", function(){
  ReactiveAggregate(this, Funnel, [
    {$sort: {date: -1}},
    {$group: {_id: "$uid", status: {$last: "$status"}}}
	]);
});

Meteor.publish("funnelHistory", function(){
  return  FunnelHistory.find();
});


Meteor.publish("currentStatus", function(){
	ReactiveAggregate(this, Status, [
		{$sort: {date: -1}},
    {$group: {_id: "$uid", status: {$last: "$status"}}}
	]);
});
