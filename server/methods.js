import { Accounts } from 'meteor/accounts-base';
import { runDbMigration } from '/server/utils.js';
import Contact from '/lib/classes/Contact.js';

Meteor.methods({
  getRootURL() {
    return process.env.ROOT_URL;
  },
  enrollUser(id){
    if(!this.isSimulation){
      Accounts.sendEnrollmentEmail(id);
    }
  },
  passReset(uid){
      Accounts.sendResetPasswordEmail(uid);
  },
	sendErrorEmail(route, message, stack){
		let name = "Not signed in.";
		if(!!Meteor.userId()){
			name = Meteor.user().name;
		}
		const body = `
			<b><i>Error report</i></b>
			<br><br>
			<b>User:</b>
			${name}
			<br><br>
			<b>Message:</b><br>
			${message}
			<br><br>
			<b>Stack:</b><br>
			${stack}
		`;
		Meteor.defer(()=>{
			sendEmail({
				to: "awe6013@rit.edu",
				from: "Ivy Error Handling <ivy@rit.edu>",
				subject: "Client-Side Error",
				html: body
			});
		});
	},
  sendEventServiceRequest(uid,eid,pos){
    var contact = new Contact(Meteor.users.findOne(uid));
    var event = Events.findOne(eid);
    this.unblock();

    Email.send({
      to: contact.getEmail(),
      from: "Ivy Information System",
      subject: "New Event Service Request: " + event.name + " - " +pos,
      text: "<p>Dear "+ contact.getName() + "</p><p>You have been requested to serve in the position of "
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
      to: contact.getEmail(),
      from: "Ivy Information System",
      subject: "Account Creation Confirmation Email",
      text: "<p>Dear "+ contact.getName() + "</p><br/><p>Please follow the link below to continue creating your account. "
      + "<a href='"+process.env.ROOT_URL+"/signup/'"+ contact._id +">Sign up Here</a>\n\n"
      + "- Ivy"
    });
  },
  groupAssignedEmail(gid, tid){
    var ticket = Tickets.findOne(tid);
    var group = Groups.findOne(gid);
    var users = Meteor.users.find({_id: {$in: group.users}}).fetch();
    var emails = [];
    users.forEach(function(contact){
      contact = new Contact(contact);
      emails.push(contact.getEmail());
    });
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
    var contact = new Contact(Meteor.users.findOne(uid));
    Email.send({
      to: contact.getEmail(),
      from: "Ivy Information System",
      subject: "New Ticket Assigned to You: \""+ticket.subject+"\"",  // Insert Ticket Subject in subject line
      html: "<p>Dear "+ contact.getName() + "</p><br/><p>A new ticket has been assigned to you.</p><p>Subject: "+ticket.subject+"</p>"
      + "<p>Description: "+ticket.description+"</p>"+"<a href='"+process.env.ROOT_URL+"tickets/"+ticket._id
      + "'><button>View Ticket</button></a><br/><br/>"
      // insert html for ticket info here
      + "- Ivy Information System"
    });
  },
  getDuplicateContacts(){
    var result = Meteor.users.aggregate( [{"$match": {deleted: {$ne: true}}},
      {"$group" : { "_id": "$name", "count": { "$sum": 1 }, ids: {$push: "$_id"}} },
      {"$match": {"_id" :{ "$ne" : null } , "count" : {"$gt": 1} } }] );
    var ids =[];
      for(var i=0;i<result.length;i++){
        for(var y=0;y<result[i].ids.length;y++){
          ids.push(result[i].ids[y]);
        }
      }
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
    return rst;
  },
  updateContactFunnelStatus(uid){
    var intervl = 7; //In days
    var period = 4; //In intervls
    var threshold = 2; //Integer # of intervals
    var endDate = new Date();
    var startDate = new Date();
    //startDate.setDate(startDate.getDate() - period);
    startDate = new moment(startDate.toISOString()).subtract(intervl,"days")._d
    //var eventsPerInterval = {};
    var eventsPerInterval = [];
    for (var c = 0; c < period; c++) { //Sets up an object with key:number of intervals ago, and value:a list of events that went on in that interval.
      var events = [];
      startDate = new moment(endDate.toISOString()).subtract(intervl,"days")._d;
      //eventsPerInterval[(c+1)] = Events.find({
      var eventsFound = Events.find({
        start:{
          $gte : startDate,//startDate.setDate(startDate.getDate() - intervl),
          $lt : endDate
        },
        published: true
      }).fetch();
      if(eventsFound.length==0){
        endDate = startDate;
        c--;
        continue;
      }
      eventsFound.forEach((event)=>{
        events.push(event._id);
      });
      eventsPerInterval.push(events);
      endDate = startDate;
    }
    var mults = Groups.findOne("multipliers").users;
    let user = Meteor.users.findOne(uid);
    if(Groups.find({_id: "multipliers", users: uid}).fetch().length>0){
      Meteor.users.update({_id : uid}, {$set : {status : "Multiplier"}});
    } else if (Groups.find({leader : uid}).fetch().length > 0) {
      Meteor.users.update({_id : uid}, {$set : {status : "Leader"}});
    } else if (Groups.find({type : "Team", users : uid}).fetch().length > 0) {
      Meteor.users.update({_id : uid}, {$set : {status : "Server"}});
    } else if (user.member) {
      Meteor.users.update({_id : uid}, {$set : {status : "Member"}});
    } else {
      var count = 0;

      eventsPerInterval.forEach((intvl)=>{

        if(Events.find({_id: {$in: intvl}, "attendees._id": uid}).fetch().length>0){
          count++
        }
      });

      if (count>=threshold) {
        Meteor.users.update({_id : uid}, {$set : {status : "Visitor"}});
      } else {

        Meteor.users.update({_id : uid}, {$set : {status : "Crowd"}});
      }
		}
  },
	addEmailModuleLabels(){
		const types = Options.findOne("emailtypes");
		let typeDict = {};
		types.vals.forEach( (type)=>{
			typeDict[type.value] = type.name;
		});

		const emails = Emails.find().fetch();
		emails.forEach((email)=>{
			let modules = email.modules;

			modules.map((module)=>{
				if(!module.hasOwnProperty('label')){
					module.label = typeDict[module.type];
				}
			});

			Emails.update(email._id, {$set: {modules: modules}});

		});

	}


});
