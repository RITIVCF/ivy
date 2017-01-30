ContactsBackup = new Mongo.Collection("contactsbackup");
EventsAttendanceBackup = new Mongo.Collection("eventsattendancebackup");

Meteor.publish("allEvents", function(){
  return Events.find({deleted: {$ne: true}});
});

Meteor.publish("summaryEvents", function(){

  //return Events.find({$or: [{}]});
});

Meteor.publish("myAttendedEvents", function(){
  return Events.find({"attendees._id": this.userId, deleted: {$ne: true}});
  //return Events.find({$or: [{}]});
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
  return Events.find({published: true, start: {$gte: new Date(),$lte: twoweeks}, deleted: {$ne: true}},{limit: 3});
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
    {published: true},
    {"permUser.id": this.userId},
    {"permGroup.id": {$in: ids}}
  ], deleted: {$ne: true}});
});

Meteor.publish("otherUnpublishedEvents", function(){
  // var grps = Groups.find({users: this.userId}).fetch();
	// var ids = [];
	// grps.forEach(function(group){
	// 	ids.push(group._id);
	// });
	//console.log("GGroups:");
	//console.log(ids);
  //console.log(checkPermission("events", this.userId));
  //if(perm){
  var options = {fields: {start: 1, end:1, published: 1, permUser: 1, permGroup: 1}};
  if(Groups.find({_id:"admin", users: this.userId}).fetch().length==1){
		options = {};
	}
    return Events.find({deleted: {$ne: true}}, options);
  //}

});

// all published events, plus my unpublished events

Meteor.publish("publishedEvents", function(){
  return Events.find({published: true, deleted: {$ne: true}});
  //console.log(Events.find({published: true}));
  // var events = Events.aggregate([{ "$project" : { title:"$name", start: 1, end: 1 }}, {"$match": {published: true}}]);
  // console.log(events);
  // //console.log(events.fetch());
  // return events;
});

Meteor.publish("pastEvents", function(lim){
  if(lim == 0){
    return Events.find({
      published: true,
      start: {$lt: new moment(new Date().toISOString()).add(2, "hours")._d},
      deleted: {$ne: true}
    },{sort: {start:-1} // Sorts descending chronologically by start
    });
  }
  return Events.find({
    published: true,
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
  return Churches.find();
});

Meteor.publish("activeChurches", function(){
  return Churches.find({active: true});
});

/*  Contact functions*/
Meteor.publish("contact", function(cid){
  //console.log(cid);
  if(!cid){
    //console.log("Finding one");
    try{
      cid = this.userId; //Meteor.user().contact;
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
    member: 1
     }
  }
  return Meteor.users.find(selector, options);
});

Meteor.publish("allContacts", function(filtr, srt){
  /*const options = {
    fields: {
      _id: 1,
      name: 1,
      email: 1,
      phone: 1
    }
  }*/

  var selector = {deleted: {$ne: true}};
/*
  if(filtr == "Contact"){
    selector = {
      member: {$ne: true}
    };
  }
  if(filtr == "Member"){
    selector = {
      member: true
    };
  }*/
  // if(filtr != "All")
  // selector = {
  //     status: filtr
  // };

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
      member: 1
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

Meteor.publish("publicContacts", function(){
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

Meteor.publish("userContacts", function(){
  var users = Meteor.users.find({},{contact: 1}).fetch();
  var cids = []
  users.forEach(function(user){
    cids.push(user.contact);
  });
  return Contacts.find({_id: {$in: cids}});
});

Meteor.publish("duplicateContacts", function(){
  var result = Meteor.users.aggregate(     {"$group" : { "_id": "$name", "count": { "$sum": 1 }, ids: {$push: "$_id"}} },
    {"$match": {"_id" :{ "$ne" : null } , "count" : {"$gt": 1} } } );
    //console.log(result);
  var ids =[];
    for(var i=0;i<result.length;i++){
      for(var y=0;y<result[i].ids.length;y++){
        ids.push(result[i].ids[y]);
      }
    }
    //console.log(ids);
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
  /*const options = {
    fields: {
      _id: 1,
      contact: 1
    }
  }*/
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
  /*const options = {
    fields: {
      _id: 1,
      contact: 1
    }
  }*/
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
  const selector = {
    $and: [
      {status: {$ne: "Closed"}},
      {status: {$ne: "Canceled"}}
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
  //console.log(grps);
	var ids = [];
	grps.forEach(function(group){
		ids.push(group._id);
	});
  //console.log(ids);
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
  return Tickets.find({},{fields:{status: 1}});
});

Meteor.publish("thisTicket", function(tid){
  var ticket = Tickets.findOne(tid);
  //console.log(ticket);
  //console.log(Events.find({_id:ticket.eid}).fetch());
  return [Tickets.find({_id: tid}),Events.find({_id:ticket.eid})];
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

//***************************************

// *******    Debrief   ************
Meteor.publish("myDebriefDrafts", function(){
  return Debriefs.find({uid: this.userId});
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

Meteor.publish("funnelHistory", function(){
  return  FunnelHistory.find();
})
