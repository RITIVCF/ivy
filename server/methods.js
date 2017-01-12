import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
  enrollUser(id){
    if(!this.isSimulation){
      Accounts.sendEnrollmentEmail(id);
    }
  },
  passReset(uid){
      Accounts.sendResetPasswordEmail(uid);
  },
  sendEventServiceRequest(uid,eid,pos){
    var contact = Meteor.users.findOne(uid);
    var event = Events.findOne(eid);
    this.unblock();

    Email.send({
      to: contact.email[0].address,
      from: "Ivy Information System",
      subject: "New Event Service Request: " + event.name + " - " +pos,
      text: "<p>Dear "+ contact.name + "</p><p>You have been requested to serve in the position of "
      + pos + " for the event " + event.name + " on " + moment(event.start).format("Do MMM YY") + " at "
      + moment(event.start).format("HH:mmA")
      + ". You can view this request on the Ivy events page: "
      + "<a href='"+process.env.ROOT_URL+"/events'>Event Summary</a>, or you can reply with the buttons below.</br></br> "
      + "<a href='"+process.env.ROOT_URL+"/events/servicerequests/accept/" + eid + "/"+uid+"'><button color='green'>Accept</button></a>"
      + "<a href='"+process.env.ROOT_URL+"/events/servicerequests/decline/" + eid + "/" +uid+"'><button color='red'>Decline</button></a>"
    });
  },
  contactEmailConfirmation(contact){
    Email.send({
      to: contact.email,
      from: "Ivy Information System",
      subject: "Account Creation Confirmation Email",
      text: "<p>Dear "+ contact.name + "</p><br/><p>Please follow the link below to continue creating your account. "
      + "<a href='"+process.env.ROOT_URL+"/signup/'"+ contact._id +">Sign up Here</a>\n\n"
      + "- Ivy"
    });
  },
  groupAssignedEmail(gid, tid){
    var ticket = Tickets.findOne(tid);
    var group = Groups.findOne(gid);
    var users = Meteor.users.find({_id: {$in: group.users}}).fetch();
    console.log("users");
    console.log(users);
    var emails = [];
    users.forEach(function(contact){
      //var contact = Meteor.users.findOne(user.contact);
      console.log("pushing: "+contact.email[0].address);
      emails.push(contact.email[0].address);
    });
    console.log("emails:");
    console.log(emails);
    Email.send({
      to: emails,
      from: "Ivy Information System",
      subject: "New Ticket Assigned to Your Group: "+group.name,
      html: "<p>A new ticket has been assigned to your group: "+group.name+"</p><p>Subject: "+ticket.subject+"</p>"
      + "<p>Description: "+ticket.description+"</p>"+"<a href='"+process.env.ROOT_URL+"tickets/"+ticket._id
      + "'><button>View Ticket</button></a>"
    });
  },
  userAssignedEmail(uid, tid){
    var ticket = Tickets.findOne(tid);
    var contact = Meteor.users.findOne(uid);
    Email.send({
      to: contact.email[0].address,
      from: "Ivy Information System",
      subject: "New Ticket Assigned to You: \""+ticket.subject+"\"",  // Insert Ticket Subject in subject line
      html: "<p>Dear "+ contact.name + "</p><br/><p>A new ticket has been assigned to you.</p><p>Subject: "+ticket.subject+"</p>"
      + "<p>Description: "+ticket.description+"</p>"+"<a href='"+process.env.ROOT_URL+"tickets/"+ticket._id
      + "'><button>View Ticket</button></a><br/><br/>"
      // insert html for ticket info here
      + "- Ivy"
    });
  },
  getDuplicateContacts(){
    var result = Meteor.users.aggregate( [{"$match": {deleted: {$ne: true}}},
      {"$group" : { "_id": "$name", "count": { "$sum": 1 }, ids: {$push: "$_id"}} },
      {"$match": {"_id" :{ "$ne" : null } , "count" : {"$gt": 1} } }] );
      //console.log(result);
    var ids =[];
      for(var i=0;i<result.length;i++){
        for(var y=0;y<result[i].ids.length;y++){
          ids.push(result[i].ids[y]);
        }
      }
      //console.log(ids);
      result = Meteor.users.aggregate( [{"$match": {deleted: {$ne: true}}},
        {"$group" : { "_id": "$email", "count": { "$sum": 1 }, ids: {$push: "$_id"}} },
        {"$match": {"_id" :{ "$ne" : null } , "count" : {"$gt": 1} } } ]);
        for(var i=0;i<result.length;i++){
          for(var y=0;y<result[i].ids.length;y++){
            ids.push(result[i].ids[y]);
          }
        }
    return ids;
  },
  setUserUsername(username){
    Accounts.setUsername(Meteor.userId(), username);
  },
  mergeAndDeleteContact(did,mid,options){
    var dc = Meteor.users.findOne(did);
    var mc = Meteor.users.findOne(mid);

    if(options.name){
      Meteor.users.update({_id:mc._id},{$set: {name: dc.name}});
    }
    if(options.email){
      Meteor.users.update({_id:mc._id},{$set: {email: dc.email}});
    }
    if(options.phone){
      Meteor.users.update({_id:mc._id},{$set: {phone: dc.phone}});
    }
    if(options.major){
      Meteor.users.update({_id:mc._id},{$set: {major: dc.major}});
    }
    if(options.bio){
      Meteor.users.update({_id:mc._id},{$set: {bio: dc.bio}});
    }
    if(options.news){
      Meteor.users.update({_id:mc._id},{$set: {newsletter: dc.newsletter}});
    }

    // if(!Events.findOne({"attendees._id":uid, _id: eid})){
    //   THis should check and make sure that the duplicate wasn't created at the same event.
    //  Look at Emma conrick on the most recent event for explanation
    //  It shows three people but there are 4 records
    // }
    Events.update({"attendees._id":did},{$set:{"attendees.$.ticket":""}},{multi: true});
    Events.update({"attendees._id":did},{$set:{"attendees.$.firsttime":false}},{multi: true});
    Events.update({"attendees._id":did},{$set:{"attendees.$._id":mid}},{multi: true});
    Tickets.update({_id: dc.ticket},{$set: {deleted: true}});
    //Tickets.remove({_id: dc.ticket});
    Meteor.users.update({_id:did},{$set: {deleted: true}});
    //Meteor.users.remove({_id: did});
    /* CREATE A LOG OF ALL DELETED Meteor.users FOR HISTORY'S SAKE */
  },
  currentFunnel(){
    var result = Meteor.users.aggregate([
      {"$match": {deleted: {$ne: true}}},
      {$group: {_id: "$status", count: {$sum: 1}}}
    ]);
    var rst = {};
    var max = 0;//var cnts = [];
    var max2 = 0;
    result.forEach((result)=>{
      rst[result._id] = result.count;
      if(result.count > max){
        max = result.count;
      }
      if(result._id!="Crowd"){
        if(result.count > max2){
          max2 = result.count;
        }
      }
    });
    rst.max = max;//= Math.max(cnts);
    rst.max2 = max2;
    return rst;
  },
  currentFunnelMembership(){
    var result = Meteor.users.aggregate([
      {"$match": {deleted: {$ne: true}}},
      {"$match": {member: true}},
      {$group: {_id: "$status", count: {$sum: 1}}}
    ]);
    var rst = {};
    var max = 0;//var cnts = [];
    var max2 = 0;
    result.forEach((result)=>{
      rst[result._id] = result.count;
      if(result.count > max){
        max = result.count;
      }
      if(result._id!="Crowd"){
        if(result.count > max2){
          max2 = result.count;
        }
      }
    });
    rst.max = max;//= Math.max(cnts);
    rst.max2 = max2;
    return rst;
  },
  funnelTime(numdays){
    if(numdays!="0"){
      //  console.log("Numdays: "+numdays);
      //  console.log(new moment().subtract(parseInt(numdays)+1, "days")._d);
        var result = FunnelHistory.find({timestamp: {$gte: new moment().subtract(parseInt(numdays)+1, "days")._d}}).fetch();
    }
    else{
        var result = FunnelHistory.find().fetch();
    }

    var rst = {
      crowd: [],
      visitor: [],
      member: [],
      server: [],
      leader: [],
      multiplier: [],
      timestamp: []
    };
    var totals = [];
    var crowds = [];
    result.forEach((date)=>{
      rst.timestamp.push(new moment(date.timestamp).format("MM/DD/YY"));
      rst.crowd.push(date.Crowd?date.Crowd:0);
      rst.visitor.push(date.Visitor?date.Visitor:0);
      rst.member.push(date.Member?date.Member:0);
      rst.server.push(date.Server?date.Server:0);
      rst.leader.push(date.Leader?date.Leader:0);
      rst.multiplier.push(date.Multiplier?date.Multiplier:0);
      crowds.push(date.Crowd?date.Crowd:0);
      totals.push(
        (date.Crowd?date.Crowd:0)+
        (date.Visitor?date.Visitor:0)+
        (date.Member?date.Member:0)+
        (date.Server?date.Server:0)+
        (date.Leader?date.Leader:0)+
        (date.Multiplier?date.Multiplier:0));
    });
    rst.max = Math.max.apply(null,totals);
    rst.min = Math.min.apply(null,crowds);

    rst.max = ((rst.max-rst.min)>20)?(rst.max+5):(rst.max+2);
    rst.min = ((rst.max-rst.min)>20)?(rst.min-5):(rst.min-2);
    if(rst.min<0){
      rst.min=0;
    }
    // console.log(rst);
    // console.log(totals);
    // console.log(rst.max);
    return rst;
  },
  testCreation(){
    console.log(Accounts.createUser({email: "testemail@email.com"}));
  },
  migrateDatabase(){
    //var userMeteor.users = Meteor.users.find({user: true}).fetch();
    var notUserContacts = Contacts.find({user: {$ne: true}}).fetch();

    // CONTACT ONLY UPDATE SECTION
    notUserContacts.forEach((contact)=>{
      console.log("Contact");
      console.log(contact);
      var contactid=contact._id;
      delete contact._id;
      var uid = Accounts.createUser(contact);
      //Contacts.update({_id: contactid},{$set: {user:true}});
      Meteor.users.update({_id: uid},{$set: {contact: contactid}});
      //===========  Event update attendance ids
    Events.update(
      {"attendees._id":contactid}, // where cid is an attendee
      {$set:
        {"attendees.$._id":uid}   // set attendee id to user id
      },
      {multi: true}
    );
    //===============
    Churches.update(
      {contacts: contactid},
      {$addToSet: {contacts: uid}},
      {multi: true}
    );
    Churches.update(
      {contacts: contactid},
      {$pull: {contacts: contactid}},
      {multi: true}
    );
    //===============
    });
    var retval;
    //
    //     USER UPDATE SECTION
    var userContacts = Contacts.find({user: true}).fetch();
    userContacts.forEach((contact)=>{
      console.log("Contact");
      console.log(contact);

      var contactid = contact._id;
      delete contact._id;
      Meteor.users.update({contact: contactid}, {$set: contact});
      console.log("Updated user");
      console.log(
        Meteor.users.findOne({contact: contactid})
        );
        console.log("contactid: ",contactid);
      var user = Meteor.users.findOne({contact: contactid});
        //===========  Event update attendance ids
        if(user.name=="Bobby Picciotti"){
          var events =Events.find({_id: "4ZCcw5oneKYwCjmLo", "attendees._id":contactid},{name: 1, attendees: 1}).fetch();
          events.forEach((event)=>{
            console.log("Event Name": event.name);
            event.attendees.forEach((attendee)=>{
              console.log(attendee);
            })
          });
        }
        if(user.name=="Bobby Picciotti"){
          console.log("Updating attendance");
        }
      Events.update(
        {"attendees._id":contactid}, // where cid is an attendee
        {$set:
          {"attendees.$._id": user._id}   // set attendee id to user id
        },
        {multi: true}
      );
      Events.update(
        {"attendees._id":contactid}, // where cid is an attendee
        {$pull:
          {attendees: {_id: contactid}}   // pull any duplicates
        },
        {multi: true}
      );
      if(user.name=="Bobby Picciotti"){
        events.forEach((event)=>{
          console.log("Event Name": event.name);
          event.attendees.forEach((attendee)=>{
            console.log(attendee);
          })
        });
      }
      //===============
      Churches.update(
        {contacts: contactid},
        {$addToSet: {contacts: user._id}},
        {multi: true}
      );
      Churches.update(
        {contacts: contactid},
        {$pull: {contacts: contactid}},
        {multi: true}
      );
      //===============

    });
    Meteor.users.update({},{$set: {preferences: {
      "theme-color": "Default",
      "contacts_view":"Tile",
      "contacts_infobar": true,
      "tickets_view":"List",
      "tickets_infobar":true,
      "calendar_view":"month",
      "events_infobar":true,
      "groups_view": "Team",
      "churches_view":"Tile",
      "churches_infobar":true
      }
    }}, {multi: true});




    // OPtions
    var requesttypes = Options.findOne("requesttypes").vals;
    console.log("Request Types: ", requesttypes);
    var newtypes = [];
    requesttypes.forEach((type)=>{
        var typobj = {label:type,gid: "admin"};
        console.log(typobj);
        newtypes.push(typobj);
    });
    console.log("New types", newtypes);
    Options.update("requesttypes",{$set: {vals: newtypes}});

    var eventtags = Options.findOne("eventtags").vals;
    console.log("Event Tags: ", eventtags);
    var colors = ["#FF0","#0FF","#0F0","#F0F","#00F","#F00"];
    var cnt = 0;
    var newtags = [];
    eventtags.forEach((tag)=>{
      var tagobj = {tag: tag, color: colors[cnt]};
      console.log("New tag: ", tagobj);
      newtags.push(tagobj);
      cnt+=1;
    });
    console.log("New Tags: ",newtags);
    Options.update("eventtags", {$set: {vals: newtags}});

    //Email Template Initialization
    Emails.insert({
      _id: "newsletter",
      title: "Newsletter",
      to: {users: [],groups:[],emails:[]},
      from: "ivcf@rit.edu",
      subject: "IVCF Chapter Newsletter",
      content: "",
      isTemplate: true
    });

    //Page Permissions
    PagePermissions.insert({
      "_id" : "emails",
      "groups" : ["admin"],
      "pagename" : "View/Edit Emails"
    });
    PagePermissions.insert({
      "_id" : "ivrep",
      "groups" : [ "" ],
      "pagename" : "IV Official"
    });

    //Event Workpad changes
    var events = Events.find().fetch();
    events.forEach((event)=>{
      var newworkpad = [
          {
            "name" : "Pad 1",
            "content" : event.workpad,
            "lock" : false
          }
        ]
      Events.update({_id: event._id},{$set: {workpad: newworkpad}});
    });

    return retval;


  }

})
