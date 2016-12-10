import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
  passReset(uid){
      Accounts.sendResetPasswordEmail(uid);
  },
  sendEventServiceRequest(uid,eid,pos){
    var contact = Contacts.findOne(Meteor.users.findOne(uid));
    var event = Events.findOne(eid);
    this.unblock();

    Email.send({
      to: contact.email,
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
    users.forEach(function(user){
      var contact = Contacts.findOne(user.contact);
      console.log("pushing: "+contact.email);
      emails.push(contact.email);
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
    var contact = Contacts.findOne(Meteor.users.findOne(uid).contact);
    Email.send({
      to: contact.email,
      from: "Ivy Information System",
      subject: "New Ticket Assigned to You: \""+ticket.subject+"\"",  // Insert Ticket Subject in subject line
      html: "<p>Dear "+ contact.name + "</p><br/><p>A new ticket has been assigned to you.</p><p>Subject: "+ticket.subject+"</p>"
      + "<p>Description: "+ticket.description+"</p>"+"<a href='"+process.env.ROOT_URL+"tickets/"+ticket._id
      + "'><button>View Ticket</button></a><br/><br/>"
      // insert html for ticket info here
      + "- Ivy"
    });
  },
  setUserUsername(username){
    Accounts.setUsername(Meteor.userId(), username);
  },
  mergeAndDeleteContact(did,mid,options){
    var dc = Contacts.findOne(did);
    var mc = Contacts.findOne(mid);

    if(options.name){
      Contacts.update({_id:mc._id},{$set: {name: dc.name}});
    }
    if(options.email){
      Contacts.update({_id:mc._id},{$set: {email: dc.email}});
    }
    if(options.phone){
      Contacts.update({_id:mc._id},{$set: {phone: dc.phone}});
    }
    if(options.major){
      Contacts.update({_id:mc._id},{$set: {major: dc.major}});
    }
    if(options.bio){
      Contacts.update({_id:mc._id},{$set: {bio: dc.bio}});
    }
    if(options.news){
      Contacts.update({_id:mc._id},{$set: {newsletter: dc.newsletter}});
    }

    Events.update({"attendees._id":did},{$set:{"attendees.$.ticket":""}});
    Events.update({"attendees._id":did},{$set:{"attendees.$.firsttime":false}});
    Events.update({"attendees._id":did},{$set:{"attendees.$._id":mid}},{multi: true});
    Tickets.remove({_id: dc.ticket});
    Contacts.remove({_id: did});
  },
  currentFunnel(){
    var result = Contacts.aggregate({$group: {_id: "$status", count: {$sum: 1}}});
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
  funnelTime(){
    var result = FunnelHistory.find().fetch();
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
    result.forEach((date)=>{
      rst.timestamp.push(new moment(date.timestamp).format("MM/DD/YY"));
      rst.crowd.push(date.Crowd?date.Crowd:0);
      rst.visitor.push(date.Visitor?date.Visitor:0);
      rst.member.push(date.Member?date.Member:0);
      rst.server.push(date.Server?date.Server:0);
      rst.leader.push(date.Leader?date.Leader:0);
      rst.multiplier.push(date.Multiplier?date.Multiplier:0);
      totals.push(
        (date.Crowd?date.Crowd:0)+
        (date.Visitor?date.Visitor:0)+
        (date.Member?date.Member:0)+
        (date.Server?date.Server:0)+
        (date.Leader?date.Leader:0)+
        (date.Multiplier?date.Multiplier:0));
    });
    rst.max = Math.max(totals);
    return rst;
  }

})
