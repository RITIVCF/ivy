Meteor.methods({

  matchUserContact(uid, cid, eml){
    Meteor.users.update(uid, {$set:{contact: cid}});
    Meteor.users.update(uid, {$set:{email: eml}});
  },

  addGroup(nme,sec){
    Groups.insert({
      name: nme,
      contacts: [],
      users: [],
      admingroup: sec,
      sg: false,
    });
  },
  addSmallGroup(nme){
    Groups.insert({
      name: nme,
      leader: Meteor.userId(),
      contacts: [],
      sg: true
    });
  },
  addContactToGroup(gid, cid){
    Groups.update(gid,
      {$addToSet: {contacts: cid}}
    );
  },
  addUserToGroup(gid, uid){
    Groups.update(gid,
      {$addToSet: {users: uid}}
    );
  },
  removeContactFromGroup(gid, cid){
    Groups.update(gid,
      {$pull: {contacts: cid}}
    );
  },
  removeUserFromGroup(gid, uid){
    Groups.update(gid,
      {$pull: {users: uid}}
    );
  },
  updateGroupName(gid, text){
    Groups.update(gid, {$set:{name: text}});
  },
  toggleAdminGroup(gid, value){
    Groups.update(gid, {$set:{admingroup: value}});
  },
  addEthnicity(ethnicity){
    Options.update({_id:"ethnicities"},{$addToSet:{vals: ethnicity}});
  },

  // Page Permissions
  addGroupToPage(pageid, gid){
    PagePermissions.update({_id:pageid}, {$addToSet: {groups: gid}});
  },
  removeGroupFromPage(pageid, gid){
    if(Groups.findOne(gid).name=="Administrator"){
      return;
    }
    PagePermissions.update({_id: pageid}, {$pull: {groups:gid}});
  },

  // Event stuff
  addBlankEvent(){
    var id = Events.insert({
      name: "New Event",     // Name  *publicly visab
      namelock: false,
      createdAt: new Date(),   //Date created
      published: false,    // published to the public calendar
      permUser: [],      // {UserID: true/false}   true=edit, false=view
      permGroup: [],     // {GroupID: true/false}    true=edit, false=view
      start: new Date(),    // date time object
      end: new moment(new Date().toISOString()).add(1, "hours")._d,      // Date time object
      workpad: "",      // text area for working
      workpadlock: false,
      description: "", // public description
      descriptionlock: false,
      notes: "",   // the notes field for all the workspace
      location: "",  // text area for location
      locationlock: false,
      host: "", // user ID of the host
      owner: Meteor.userId(), // user ID of the creator and owner. Can be changed.
      tags: [],     // tags to sort events by, not type as there can be more than one type potentially
      reoccuring: false,  // false if not reoccuring, number to match reoccuring events
      notes: [],    // This is an array of note objects  {note: "text", createdAt: "DateTime", createdBy: "user ID"}
      attachements: [],  // This is an array of text objects pointing to different attachements
      attendees: [],     // This is an array of user Ids of people who attended
      rsvps: [],         // This is an array of {userId: , rsvp: [yes, no, interested]} of people who RSVPed to this event (Mostly for conference sign ups and such)
      pic: "",   // pointer to image location, less we deem sending pictures to the database better
      reserved: false, //room reserved
      evr: false,  // registered with university
      jobs: []     // {id: userid, jobname: "Job Name"}
    });
    return id;
  },
  updateEventStart(eid,datetime){
    Events.update(eid,{$set: {"start":datetime}});
  },
  updateEventEnd(eid,datetime){
    Events.update(eid,{$set: {"end":datetime}});
  },
  togglePublishEvent(eid,status){

    if(status){
      status = false;
    }
    else {
      status = true;
    }
    Events.update(eid, {$set: {"published": status}});
  },
  updateEventDescription(eid,description){
    Events.update(eid,{$set: {"description":description}});
  },
  EventDescriptionLock(eid,  status){
    Events.update(eid, {$set: {"descriptionlock": status}});
  },
  updateEventName(eid,name){
    //console.log(name);
    Events.update(eid,{$set: {"name": name}});
  },
  EventNameLock(eid,  status){
    Events.update(eid, {$set: {"namelock": status}});
  },
  updateEventLocation(eid,location){
    Events.update(eid,{$set: {"location": location}});
  },
  EventLocationLock(eid,  status){
    Events.update(eid, {$set: {"locationlock": status}});
  },
  updateEventWorkpad(eid,text){
    Events.update(eid,{$set: {"workpad": text}});
  },
  EventWorkpadLock(eid,  status){
    Events.update(eid, {$set: {"workpadlock": status}});
  },
  updateEventTags(eid,tags){
    Events.update(eid,{$set: {"tags": tags}});
  },
  updateEventReserved(eid,status){
    Events.update(eid,{$set: {"reserved": status}});
  },
  updateEventEVR(eid,status){
    Events.update(eid,{$set: {"evr": status}});
  },
  updateEventPermissions(eid, permUsers, permGroups){
    Events.update(eid, {$set: {"permUser": permUsers}});
    Events.update(eid, {$set: {"permGroup": permGroups}});
  },
  addEventUserPerm(eid, userId){
    Events.update(eid, {$addToSet: {"permUser": {id: userId, edit: false}}});
  },
  updateEventUserPerm(eid, userId, status){
    Events.update({_id:eid, "permUser.id": userId}, {$set: {"permUser.$.edit": status}});
  },
  removeEventUserPerm(eid, perm){
    Events.update(eid, {$pull: {"permUser": perm}});
  },
  addEventGroupPerm(eid, groupId){
    Events.update(eid, {$addToSet: {"permGroup": {id:groupId, edit: false}}});
  },
  updateEventGroupPerm(eid, groupId, status){
    Events.update({_id: eid, "permGroup.id": groupId}, {$set: {"permGroup.$.edit": status}});
  },
  removeEventGroupPerm(eid, perm){
    Events.update(eid, {$pull: {"permGroup": perm}});
  },
  changeEventOwner(eid, uid){
      Events.update(eid, {$set: {"owner": uid}});
  },

  // Job stuff
  createJobRequest(eid, uid, jobname, submitby){
    Events.update(eid, {$addToSet: {"jobs": {uid:uid, job: jobname, status: "Pending", submittedby: submitby}}});
    var contact = Contacts.findOne(Meteor.users.findOne(uid).contact);
    var event = Events.findOne(eid);
    this.unblock();

    Email.send({
      to: contact.email,
      from: "Ivy IVCF Club Management",
      subject: "New Event Service Request: " + event.name + " - " +jobname,
      html: "<p>Dear "+ contact.name + "</p><p>You have been requested to serve in the position of "
      + jobname + " for the event " + event.name + " on " + moment(event.start).format("Do MMM YY") + " at "
      + moment(event.start).format("h:mmA")
      + ". You can view this request on the Ivy events page: "
      + "<a href='"+process.env.ROOT_URL+"events'>Event Summary</a>"//, or you can reply with the buttons below.<br/><br/> "
      //+ "<a href='"+process.env.ROOT_URL+"events/servicerequests/accept/" + eid + "/"+uid+"'>"+'<button style="color: white;background-color:#18e002;border-radius: 8px;font-size:15px;border: 5px solid #18e002;">Accept</button></a>'
      //+ "<a style='padding: 5px' href='"+process.env.ROOT_URL+"events/servicerequests/decline/" + eid + "/" +uid+"'>"+'<button style="color: white;background-color:#e01102;border-radius: 8px;font-size:15px;border: 5px solid #e01102;">Decline</button></a>'
    });
  },
  acceptJobRequest(eid, jobentry){
    Events.update({_id: eid, jobs: jobentry},{$set:{"jobs.$.status":"Accepted"}});
  },
  declineJobRequest(eid, jobentry){
    Events.update({_id: eid, jobs: jobentry},{$set:{"jobs.$.status":"Declined"}});
  },
  deleteJobRequest(eid, jobentry){
    Events.update(eid, {$pull: {jobs: jobentry}});
  },

  // Attendance stuff
  createAttendanceRecord(eid,cid,first,learnmore, howhear, tktId){
    Events.update(eid,{$addToSet: {"attendees":{
      "_id":cid,
      "firsttime":first,
      "howhear":howhear,
      "more":learnmore,
      "ticket": tktId}}});
  },
  createRSVPRecord(eid,cid,rsvp){
    Events.update(eid,{$addToSet: {"rsvps":{"_id":cid,"rsvp":rsvp}}});
  },
  deleteEvent(eid){
    Events.remove({_id:eid});
    Tickets.remove({eid:eid});
  },


  //COntact stuff
  newContact(nme, eml, phne, mjr, hwhr){
    return Contacts.insert({
      name: nme,
      email: eml,
      phone: phne,
      major: mjr,
      howhear: hwhr,
      bio: "" ,
      ticket: "",
      addresses: [],
      affiliations: [],
      communitylife: [],
      createdAt: new Date()
    });
  },
  removeContact(cid){
    Contacts.remove({_id:cid});
    //var ticket = Events.findOne({"attendance._id": cid});

    Events.update({},{$pull:{"attendees": {_id: cid}}},{multi: true});

    Churches.update({}, {$pull: {"contacts": cid}});

  },
  updateName(cid, name){
    //console.log("Before: "+name);
    Contacts.update(cid, {$set: {"name": name}});
  },
  updateEmail(cid, email){
    Contacts.update(cid, {$set: {"email": email}});  // use . notation to change nested documents
    var user = Meteor.users.findOne({contact: cid});

    if(!this.isSimulation){
      Accounts.removeEmail(user._id, user.emails[0].address);
      Accounts.addEmail(user._id, email);
    }

  },
  updatePhone(cid, phone){
    Contacts.update(cid, {$set: {"phone": phone}});
  },
  updateMajor(cid, major){
    Contacts.update(cid, {$set: {"major": major}});
  },
  updateBio(cid, bi){
    Contacts.update(cid, {$set: {"bio": bi}});
  },
  updateNewsletter(cid, status){
    Contacts.update(cid, {$set: {"newsletter": status}});
  },
  updateMember(cid, status){
    Contacts.update(cid, {$set: {"member": status}});
    Contacts.update(cid, {$set: {"memberAt": new Date()}});
  },
  updateGender(cid, gender){
    Contacts.update(cid, {$set: {"gender": gender}});
  },
  updateGradTerm(cid, term){
    Contacts.update(cid, {$set: {"gradterm": term}});
  },
  updateCurrYear(cid, level){
    Contacts.update(cid, {$set: {"curryear": level}});
  },
  updateContactAffiliations(cid, tag,addremove){
    if(addremove){
      Contacts.update(cid,{$pull: {"affiliations":tag}});
    }
    else{
        Contacts.update(cid,{$addToSet: {"affiliations": tag}});
    }
  },
  updateCommunityLife(cid, tag, addremove){
    if(addremove){
      Contacts.update(cid,{$pull: {"communitylife":tag}});
    }
    else{
        Contacts.update(cid,{$addToSet: {"communitylife": tag}});
    }
  },
  updateEthnicity(cid, ethn){
    Contacts.update(cid, {$set: {"ethn": ethn}});
  },
  updateContactIntl(cid, intl){
    Contacts.update(cid, {$set: {"intl": intl}}); // Change intl status
  },
  updateStatus(contact, stat){
    Contacts.update(contact._id, {$set: {"status": stat}});
  },
  addMailingAddress(cid){
    Contacts.update(cid, {$addToSet: {"addresses":
    {
      line1: "",
      line2: "",
      line3: "",
      city: "",
      state: "",
      zip: "",
      primary: "false"
    }
  }});
  },
  updateMailingAddress(cid, oldline, lin1, lin2, lin3, cit, stte, zp){
    //Contacts.update(Meteor.userId(), {$pull: {"addresses":{"line1":oldline}}});
    Contacts.update({"_id":cid, "addresses.line1": oldline} , {$set: {"addresses.$":
    {
      line1: lin1,
      line2: lin2,
      line3: lin3,
      city: cit,
      state: stte,
      zip: zp,
      primary: "false"
    }
  }});
  },
  removeMailingAddress(cid, lin1){
    Contacts.update(cid, {$pull: {"addresses":{"line1":lin1}}});
  },



  // Churches stuff
  addBlankChurch(){
    var id = Churches.insert({
      name: "New Church",     // Name  *publicly visab
      url: "",
      times: [{day:"Sunday",time:"10:00am"}],
      contacts: [],      //User Ids
      active: false
    });
    return id;
  },
  addChurchTime(chid){
    Churches.update(chid,{$addToSet: {"times":{day:"Sunday",time:"10:00am"}}});
  },
  updateChurchTime(chid, oldday, oldtime, newday, newtime){
    Churches.update({_id:chid, "times.day": oldday, "times.time":oldtime}, {$set:{"times.$":
      {
        day:newday,
        time: newtime}
      }
    });
  },
  removeChurchTime(chid, oldday, oldtime){
    Churches.update(chid, {$pull: {times: {day: oldday, time:oldtime}}},{multi:true});
  },
  deleteChurch(chid){
    Churches.remove({_id:chid});
  },
  toggleActiveChurch(chid,status){

    if(status){
      status = false;
    }
    else {
      status = true;
    }
    Churches.update(chid, {$set: {"active": status}});
  },
  updateChurchName(chid,text){
    Churches.update(chid,{$set: {"name": text}});
  },
  updateChurchURL(chid,text){
    Churches.update(chid,{$set: {"url": text}});
  },
  addChurchContact(chid, cid){
    Churches.update(chid,{$addToSet:{"contacts":cid}});
  },
  removeChurchContact(chid, cid){
    Churches.update(chid,{$pull:{"contacts":cid}});
  },

  // Ticket stuff
  addTicket(subj, desc, assg, assu, cust, typ){
        ret = Counters.findOne("ticketID");
    Counters.update({_id:"ticketID"}, {$inc: {seq: 1}});
    Tickets.insert({
      ticketnum: ret.seq,
      subject: subj,
      description: desc,
      assignedgroup: "",
      assigneduser: assu,
      customer: cust,  // Affected, or "customer" user
      status: "Open",
      type:"Other",
      evreqtype:"",
      activities: [],
      createdAt: new Date(),
      submittedby: Meteor.userId(),
      lastUpdated: new Date()
    });
  },
  addAttendanceTicket(subj, desc, assg, assu, cust, evid){
        ret = Counters.findOne("ticketID");
    Counters.update({_id:"ticketID"}, {$inc: {seq: 1}});
    var tktId = Tickets.insert({
      ticketnum: ret.seq,
      subject: subj,
      description: desc,
      assignedgroup: Options.findOne("ticketcontact").gid,
      assigneduser: assu,
      //customer: cust,  // Affected, or "customer" user
      status: "Open",
      type:"Contact",
      evreqtype: "",
      eid:evid,
      activities: [],
      createdAt: new Date(),
      submittedby: "Ivy System",
      lastUpdated: new Date()
    });
    Contacts.update(cust, {$set: {ticket: tktId}});
    return tktId;
  },
  addEventRequest(subj, desc, assg, assu, cust, eid, evreqtyp){
    ret = Counters.findOne("ticketID");
    Counters.update({_id:"ticketID"}, {$inc: {seq: 1}});
    Tickets.insert({
      ticketnum: ret.seq,
      subject: subj,
      description: desc,
      assignedgroup: Options.findOne("ticketeventrequest").gid,
      assigneduser: assu,
      customer: cust,  // Affected, or "customer" user
      status: "Open",
      eid: eid,   // event to which the ticket is tied
      type: "Event Request",
      ereqtype: evreqtyp,
      activities: [],
      createdAt: new Date(),
      submittedby: Meteor.userId(),
      lastUpdated: new Date()
    });
  },
  updateTicketSubject(tid, subj){
    Tickets.update(tid, {$set: {subject: subj}});
    Meteor.call("updateTicketLastUpdated", tid);
    Tickets.update(tid, {$addToSet: {activities: {createdAt: new Date(), type: "Change",
      desc: "Subject changed: "+subj, user: Meteor.userId()}}});
  },
  TicketSubjectLock(tid, status){
    Tickets.update(tid, {$set:{subjectlock: status}});
  },
  updateTicketDescription(tid, desc){
    Tickets.update(tid, {$set: {description: desc}});
    Meteor.call("updateTicketLastUpdated", tid);
    Tickets.update(tid, {$addToSet: {activities: {createdAt: new Date(), type: "Change",
      desc: "Description changed: "+desc, user: Meteor.userId()}}});
  },
  addTicketNote(tid, note){
    Tickets.update(tid, {$addToSet: {activities: {createdAt: new Date(), type: "Note",
      desc: note, user: Meteor.userId()}}});
      Meteor.call("updateTicketLastUpdated", tid);
  },
  TicketDescriptionLock(tid, status){
    Tickets.update(tid, {$set:{descriptionlock: status}});
  },
  updateTicketStatus(tid, stat){
    Tickets.update(tid, {$set: {status: stat}});
    Meteor.call("updateTicketLastUpdated", tid);
    Tickets.update(tid, {$addToSet: {activities: {createdAt: new Date(), type: "Status",
      desc: "Status changed to "+stat, user: Meteor.userId()}}});
  },
  updateTicketType(tid, typ){
    Tickets.update(tid, {$set: {type: typ}});
    if(typ != "Event Request"){
      Meteor.call("updateTicketReqType", tid, "");
    }
    Meteor.call("updateTicketLastUpdated", tid);
    Tickets.update(tid, {$addToSet: {activities: {createdAt: new Date(), type: "Type",
      desc: "Type changed to "+typ, user: Meteor.userId()}}});
  },
  updateTicketReqType(tid, typ){
    Tickets.update(tid, {$set: {ereqtype: typ}});
    Meteor.call("updateTicketLastUpdated", tid);
    Tickets.update(tid, {$addToSet: {activities: {createdAt: new Date(), type: "Request Type",
      desc: "Request changed to "+typ, user: Meteor.userId()}}});
  },
  updateTicketAssignedUser(tid, uid){
    Tickets.update(tid, {$set: {assigneduser: uid}});
    Meteor.call("updateTicketLastUpdated", tid);

    Tickets.update(tid, {$addToSet: {activities: {createdAt: new Date(), type: "Assignment",
      desc: "Assigned user changed to "+Contacts.findOne(Meteor.users.findOne(uid).contact).name, user: Meteor.userId()}}});
    Meteor.call("userAssignedEmail", uid, tid);
  },
  updateTicketAssignedGroup(tid, gid){
    Tickets.update(tid, {$set: {assignedgroup: gid}});
    Meteor.call("updateTicketLastUpdated", tid);

    Tickets.update(tid, {$addToSet: {activities: {createdAt: new Date(), type: "Assignment",
      desc: "Assigned group changed to "+Groups.findOne(gid).name, user: Meteor.userId()}}});
    Meteor.call("groupAssignedEmail",gid, tid);
  },
  updateTicketCustomer(tid, uid){
    Tickets.update(tid, {$set: {customer: uid}});
    Meteor.call("updateTicketLastUpdated", tid);
    Tickets.update(tid, {$addToSet: {activities: {createdAt: new Date(), type: "Customer",
      desc: "Customer changed to "+Contacts.findOne(Meteor.users.findOne(uid).contact).name, user: Meteor.userId()}}});
  },
  updateTicketLastUpdated(tid){
    Tickets.update(tid, {$set: {lastUpdated: new Date()}});
  },

  //Feedback area
  submitFeedback(txt, typ){
    Feedback.insert({
      text: txt,
      type: typ,
      user: Meteor.userId(),
      createdAt: new Date(),
      completed: false,
      working: false
    });
  },
  workingFeedback(feedback){
    Feedback.update(feedback._id, {$set: {working: true}});
    this.unblock();
    var contact = Contacts.findOne(Meteor.users.findOne(feedback.user).contact);
    Email.send({
      to: contact.email,
      from: "ivcf@rit.edu",
      subject: "Your Ivy Feedback Update",
      text: contact.name + "\n\n" + "We are working on your feedback:\n\n\""
      + feedback.text + "\". \n\nType: "+feedback.type +
      "\n\nThank you for your submission!\n\n -Ivy Web Team"
    });
  },
  completeFeedback(feedback){
    Feedback.update(feedback._id,{$set:{completed: true}});
    this.unblock();
    var contact = Contacts.findOne(Meteor.users.findOne(feedback.user).contact);
    Email.send({
      to: contact.email,
      from: "ivcf@rit.edu",
      subject: "Your Ivy Feedback Update",
      text: contact.name + "\n\n" + "We've completed your feedback:\n\n\""
      + feedback.text + "\". \n\nType: "+feedback.type +
      "\n\nThank you for your submission!\n\n -Ivy Web Team"
    });
  },

  // Options area
  addOption(option){
    Options.insert({_id:option, vals:[]});
  },
  addToOption(option, val){
    Options.update({_id: option}, {$addToSet:{vals:val}});
  },
  removeFromOption(option, val){
    Options.update({_id: option}, {$pull: {vals:val}});
  },
  setContactGroupDefault(id){
    Options.update({_id:"ticketcontact"},{$set:{gid:id}});
  },
  setEventRequestGroupDefault(id){
    Options.update({_id:"ticketeventrequest"},{$set:{gid:id}});
  },
  setDefaultCalendarView(value){
    Options.update({_id:"calendarview"},{$set:{val: value}});
  },


  createNewUser(email, id){
    //console.log("Execute");
    if(!this.isSimulation){
      var user = Accounts.createUser({
        sendemail: true,
        email: email,
        contactid: id
      });
      Accounts.sendEnrollmentEmail(user);
    }
  },

//react-autosuggest

  // This is for "auto"-incrementing.
  // Keys:
  //   - "reoccuring": re-occuring events key
  //   - "ticketID": ticket IDs - want these as easily referencable numbers not randomly generated
  getNextSequence(name){
    var ret = Counters.findAndModify({
      query: {_id: name},
      update: {$inc: {seq: 1}},
      new: true
    });
    return ret.seq;
  }
})
