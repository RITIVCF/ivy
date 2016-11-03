

Meteor.publish("allEvents", function(){
  return Events.find();
});

Meteor.publish("summaryEvents", function(){
  var grps = Groups.find({users: this.userId}).fetch();
	var ids = [];
	grps.forEach(function(group){
		ids.push(group._id);
	});
	//console.log("GGroups:");
	//console.log(ids);
	return Events.find({$or: [{owner: this.userId}, {"permUser.id": this.userId}, {"permGroup.id": {$in: ids}}]});
  //return Events.find({$or: [{}]});
});

Meteor.publish("ownerEvents", function(){
  return Events.find({owner: this.userId});
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
      name: 1
    }
  }
  return Events.find({_id:eid},options);
});



Meteor.publish("publishedEvents", function(){
  return Events.find({published: true});
});

Meteor.publish("pastEvents", function(lim){
  if(lim == 0){
    return Events.find({published: true, start: {$lt: new moment(new Date().toISOString()).add(2, "hours")._d} },{
      sort: {start:-1} // Sorts descending chronologically by start
    });
  }
  return Events.find({published: true, start: {$lt: new moment(new Date().toISOString()).add(2, "hours")._d} },{
    sort: {start:-1}, // Sorts descending chronologically by start
    limit: lim    // limits the number of events to publish until told to publish more
  });
})

Meteor.publish("oneEvent", function(eid){
  return Events.findOne(eid);
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

Meteor.publish("SGs", function(){
  return Groups.find({sg:true});
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
    cid = Meteor.users.findOne(this.userId).contact; //Meteor.user().contact;
  }

  const selector = {
    _id: cid
  };

  const options = {
    fields: {
    name: 1,
    addresses: 1,
    email: 1,
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
  return Contacts.find(selector, options);
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

  var selector = {};
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
    phone: 1,
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
    user: 1
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
  return Contacts.find(selector, options);
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
  var result = Contacts.aggregate(     {"$group" : { "_id": "$name", "count": { "$sum": 1 }, ids: {$push: "$_id"}} },
    {"$match": {"_id" :{ "$ne" : null } , "count" : {"$gt": 1} } } );
    //console.log(result);
  var ids =[];
    for(var i=0;i<result.length;i++){
      for(var y=0;y<result[i].ids.length;y++){
        ids.push(result[i].ids[y]);
      }
    }
    //console.log(ids);
    result = Contacts.aggregate(     {"$group" : { "_id": "$email", "count": { "$sum": 1 }, ids: {$push: "$_id"}} },
      {"$match": {"_id" :{ "$ne" : null } , "count" : {"$gt": 1} } } );
      for(var i=0;i<result.length;i++){
        for(var y=0;y<result[i].ids.length;y++){
          ids.push(result[i].ids[y]);
        }
      }
    return Contacts.find({_id: {$in: ids}});
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
    contact: 1
     }
  };
  return Meteor.users.find(selector, options);
});

Meteor.publish("allUsers", function(){
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
  return Meteor.users.find({}, options);
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

Meteor.publish("allTicketStatus", function(){
  return Tickets.find({},{fields:{status: 1}});
});

Meteor.publish("thisTicket", function(tid){
  return Tickets.find({_id: tid});
});

Meteor.publish("ticket", function(cid){
  var contact = Contacts.findOne(cid);
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
