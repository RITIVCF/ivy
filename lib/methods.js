import { Accounts } from 'meteor/accounts-base';
import { Random } from 'meteor/random';
import Event from '/lib/classes/Event.js';
import { createNewEvent } from '/lib/events.js';
import { addTicketNote, setTicketStatus, addTicket } from '/lib/tickets.js';
import { getUser } from '/lib/users.js';

Meteor.methods({
  addGroup(nme,typ,perms,usrs,ldr){
    var id = Groups.insert({
      name: nme,
      users: usrs,
      type: typ,
      leader: ldr
    });
    perms.forEach((perm)=>{
      PagePermissions.update({_id: perm},{$addToSet: {groups: id}});
    });
		if(Meteor.isServer){
			ldr.forEach( (leader) => {
				calculateFunnelStatus(leader);
			});
		}
  },
  removeGroup(id){
    Groups.remove(id);
  },
  addSmallGroup(nme){
    Groups.insert({
      name: nme,
      leader: Meteor.userId(),
      users: [],
      sg: true
    });
  },
  addUserToGroup(gid, uid){
    Groups.update(gid,
      {$addToSet: {users: uid}}
    );
		if(Meteor.isServer){
			calculateFunnelStatus(uid);
		}
  },
  removeUserFromGroup(gid, uid){
    Groups.update(gid,
      {$pull: {users: uid}}
    );
		if(Meteor.isServer){
			calculateFunnelStatus(uid);
		}
  },
  updateGroupName(gid, text){
    Groups.update(gid, {$set:{name: text}});
  },
  setGroupLeader(gid, uid){
    Groups.update(gid,
      {$addToSet: {leader: uid}}
    );
		if(Meteor.isServer){
			calculateFunnelStatus(uid);
		}
  },
  unsetGroupLeader(gid, uid){
    Groups.update(gid,
      {$pull: {leader: uid}}
    );
		if(Meteor.isServer){
			calculateFunnelStatus(uid);
		}
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
  addEvent(n,d){
		let newId = createNewEvent( n, d );
		return newId;
  },
  updateEventStart(eid,datetime){
    Events.update(eid,{$set: {"start":datetime}});
  },
  updateEventEnd(eid,datetime){
    Events.update(eid,{$set: {"end":datetime}});
  },
  togglePublishEvent(eid,status){
		let event = new Event(Events.findOne(eid));
		let newStatus = "";
    if(event.isPublished()){
      newStatus = "Unpublished";
    }
    else {
      newStatus = "Published";
    }
    Events.update(eid, {$set: {"status": newStatus}});
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
  updateEventTags(eid,tags){
    Events.update(eid,{$set: {"tags": tags}});
  },
  addEventTag(eid, tag){
    Events.update(eid, {$set: {"tags": [tag]}});
  },
  removeEventTag(eid, tag){
    Events.update(eid, {$pull: {"tags": tag}});
  },
  updateEventReserved(eid,status){
    var status = Events.findOne(eid).reserved;
    Events.update(eid,{$set: {"reserved": !status}});
  },
  updateEventEVR(eid){
    var status = Events.findOne(eid).evr;
    Events.update(eid,{$set: {"evr": !status}});
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
  createJobRequest(eid, uid, jobname, submitby, isreq){
      var ranid = Random.id();
      console.log(ranid);
        Events.update(eid, {$addToSet: {"jobs": {id: ranid, uid:uid, job: jobname, status: "Pending", submittedby: submitby, isRequest: isreq}}});
    if(isreq&&(!this.isSimulation)){
      var event = Events.findOne(eid);
      var user = Meteor.users.findOne(uid);
      var submittedby = Meteor.users.findOne(submitby);
      this.unblock();
			sendEmail({
        to: user.emails[0].address,
        from: "Ivy IVCF Club Management",
        subject: "New Event Service Request: " + jobname + " @ " + event.name,
        html: "<p>Dear "+ user.name + "</p><p>"+ submittedby.name+" requested you to serve in the position of <b>"
        + jobname + "</b> for the event <b>" + event.name + "</b> on <b>" + moment(event.start).format("Do MMM YY") + "</b> at <b>"
        + moment(event.start).format("h:mmA")
        + "</b>. You can view this request on your Ivy Dashboard: "
        + "<a href='"+process.env.ROOT_URL+"'>Dashboard</a>, or you can reply with the buttons below.<br/><br/> "
        + "<a href='"+process.env.ROOT_URL+"events/servicerequests/accept/" + eid + "/"+ranid+"'>"+'Accept</a>'
        + "<a style='padding: 5px' href='"+process.env.ROOT_URL+"events/servicerequests/decline/" + eid + "/" +ranid+"'>"+'Decline</a>'
      });

    }

  },
  acceptJobRequest(eid, jid){
    Events.update({_id: eid, "jobs.id": jid},{$set:{"jobs.$.status":"Accepted"}});
  },
  declineJobRequest(eid, jid){
    Events.update({_id: eid, "jobs.id": jid},{$set:{"jobs.$.status":"Declined"}});
  },
  deleteJobRequest(eid, jobentry){
    Events.update(eid, {$pull: {jobs: jobentry}});
  },



  createRSVPRecord(eid,uid,rsvp){
    Events.update(eid,{$addToSet: {"rsvps":{"_id":uid,"rsvp":rsvp}}});
  },
  deleteEvent(eid){
    Events.update({_id:eid},{$set: {deleted: true}});
    Tickets.update({eid:eid},{$set: {deleted: true}});
    //Events.remove({_id:eid});
    //Tickets.remove({eid:eid});
  },

  // Churches stuff
  addChurch(nme){
    var id = Churches.insert({
      name: nme,     // Name  *publicly visab
      url: "",
      times: [{day:"Sunday",time:"10:00am"}],
      contacts: [],      //User Ids
      active: false,
      deleted: false
    });
    return id;
  },
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
    Churches.update(chid,{$push: {"times":{day:"Sunday",time:"10:00am"}}});
  },
  updateChurchTime(chid, i, newday, newtime){
    let qry = {};
    qry["times."+i] = {day:newday, time: newtime};
    let set = {$set: qry};
    console.log(set);
    Churches.update({_id:chid}, set);
  },
  removeChurchTime(chid, oldday, oldtime){
    Churches.update(chid, {$pull: {times: {day: oldday, time:oldtime}}},{multi:true});
  },
  deleteChurch(chid){
    Churches.update({_id:chid},{$set: {deleted: true}});
    //Churches.remove({_id:chid});
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
  addChurchContact(chid, uid){
    Churches.update(chid,{$addToSet:{"contacts":uid}});
  },
  removeChurchContact(chid, uid){
    Churches.update(chid,{$pull:{"contacts":uid}});
  },

  // Ticket stuff
  addTicket(subj, desc, assg, assu, cust, typ){
        ret = Counters.findOne("ticketID");
    Counters.update({_id:"ticketID"}, {$inc: {seq: 1}});
    return Tickets.insert({
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
      lastUpdated: new Date(),
			deleted: false
    });
  },
  addLearnMoreTicket(uid){
		const user = getUser(uid);
		return addTicket({
			subject: "Learn more: " + user.getName(),
			description: "",
			type: "Contact",
			customer: uid,

		});
  },
  addEventRequest(subj, desc, assg, assu, cust, eid, evreqtyp){
    ret = Counters.findOne("ticketID");
    Counters.update({_id:"ticketID"}, {$inc: {seq: 1}});
    // Find which group to assign it to.
    //      Each event request type has its own group.
    var typ = Options.findOne("requesttypes").vals.find((val)=>{
      return val.label==evreqtyp;
    });
    console.log();
    var groupid = typ.gid;
    //
    Tickets.insert({
      ticketnum: ret.seq,
      subject: subj,
      description: desc,
      assignedgroup: groupid,
      assigneduser: assu,
      customer: cust,  // Affected, or "customer" user
      status: "Open",
      eid: eid,   // event to which the ticket is tied
      type: "Event Request",
      ereqtype: evreqtyp,
      activities: [],
			deleted: false,
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
		addTicketNote(tid, note, Meteor.userId() );

    Meteor.call("updateTicketLastUpdated", tid);
  },
  TicketDescriptionLock(tid, status){
    Tickets.update(tid, {$set:{descriptionlock: status}});
  },
  updateTicketStatus(tid, status){
		setTicketStatus( tid, status, Meteor.userId() );

    Meteor.call("updateTicketLastUpdated", tid);

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
      desc: "Assigned user changed to "+Meteor.users.findOne(uid).name, user: Meteor.userId()}}});
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
      desc: "Customer changed to "+Meteor.users.findOne(uid).name, user: Meteor.userId()}}});
  },
  updateTicketLastUpdated(tid){
    Tickets.update(tid, {$set: {lastUpdated: new Date()}});
  },

  //Feedback area
  submitFeedback(subj, txt, typ){
    ret = Counters.findOne("ticketID");
    Counters.update({_id:"ticketID"}, {$inc: {seq: 1}});
    return Tickets.insert({
      ticketnum: ret.seq,
      subject: subj,
      description: "Type: "+typ+"\n"+txt,
      assignedgroup: "",
      assigneduser: "",
      customer: Meteor.userId(),  // Affected, or "customer" user
      status: "Open",
      type:"Feedback",
      evreqtype:"",
      activities: [],
			deleted: false,
      createdAt: new Date(),
      submittedby: Meteor.userId(),
      lastUpdated: new Date()
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
  setEventRequestGroupDefault(id, lbl){
    Options.update(
      {_id:"requesttypes", "vals.label": lbl},
      {$set:{"vals.$.gid":id}}
    );
  },
  setDefaultCalendarView(value){
    Options.update({_id:"calendarview"},{$set:{val: value}});
  },


  createNewUser(nme, eml, phne, mjr, hwhr){
		nme = nme[0].toUpperCase() + nme.slice(1);

    //console.log("Execute");
    //if(!this.isSimulation){
      return Accounts.createUser({
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
        status: "Contact",
        createdAt: new Date()
      });
      //Accounts.sendEnrollmentEmail(user);
  //  }
  },
  updateName(uid, name){
    //console.log("Before: "+name);
		name = name[0].toUpperCase() + name.slice(1);
    Meteor.users.update(uid, {$set: {"name": name}});
  },
  updateUserEmail(uid, old, email){

    var thro = false;
		try {
			Accounts.addEmail(uid, email);
		} catch (e) {
			throw new Meteor.Error(403, "Email already exists");
		}
		// Email add was successful, remove the old one
		Accounts.removeEmail(uid, old);

  },
  updatePhone(uid, phone){
    Meteor.users.update(uid, {$set: {"phone": phone}});
  },
  updateMajor(uid, major){
    Meteor.users.update(uid, {$set: {"major": major}});
  },
  updateBio(uid, bi){
    Meteor.users.update(uid, {$set: {"bio": bi}});
  },
  updateNewsletter(uid, status){
    Meteor.users.update(uid, {$set: {"newsletter": status}});
  },
  updateMember(uid, status){
    Meteor.users.update(uid, {$set: {"member": status}});
    Meteor.users.update(uid, {$set: {"memberAt": new Date()}});
		if(Meteor.isServer){
			calculateFunnelStatus(uid);
		}
  },
  updateGender(uid, gender){
    Meteor.users.update(uid, {$set: {"gender": gender}});
  },
  updateGradTerm(uid, term){
    Meteor.users.update(uid, {$set: {"gradterm": term}});
  },
  updateCurrYear(uid, level){
    Meteor.users.update(uid, {$set: {"curryear": level}});
  },
  updateAffiliationsTag(uid, tag, status){
    if(status){
      Meteor.users.update(uid, {$pull: {affiliations:tag}});
    }
    else{
      Meteor.users.update(uid, {$addToSet: {affiliations:tag}});
    }
  },
  updateContactAffiliations(uid, tag,addremove){
    if(addremove){
      Meteor.users.update(uid,{$pull: {"affiliations":tag}});
    }
    else{
        Meteor.users.update(uid,{$addToSet: {"affiliations": tag}});
    }
  },
  addCommunityLifeTag(uid, tag){
    Meteor.users.update(uid, {$addToSet: {communitylife:tag}});
  },
  removeCommunityLifeTag(uid, tag){
    Meteor.users.update(uid, {$pull: {communitylife:tag}});
  },
  updateCommLifeTag(uid, tag, status){
    if(status){
      Meteor.users.update(uid, {$pull: {communitylife:tag}});
    }
    else{
      Meteor.users.update(uid, {$addToSet: {communitylife:tag}});
    }
  },
  updateCommunityLife(uid, tag, addremove){
    if(addremove){
      Meteor.users.update(uid,{$pull: {"communitylife":tag}});
    }
    else{
        Meteor.users.update(uid,{$addToSet: {"communitylife": tag}});
    }
  },
  updateEthnicity(uid, ethn){
    Meteor.users.update(uid, {$set: {"ethn": ethn}});
  },
  updateContactIntl(uid, intl){
    Meteor.users.update(uid, {$set: {"intl": intl}}); // Change intl status
  },
  updateStatus(user, stat){
    Meteor.users.update(user._id, {$set: {"status": stat}});
  },
  setUserTicket(uid, tid){
    Meteor.users.update(uid, {$set: {"ticket": tid}});
  },
  addMailingAddress(uid, lin1,lin2,lin3,cty,stte,zp){
    Meteor.users.update(uid, {$addToSet: {"addresses":
    {
      line1: lin1,
      line2: lin2,
      line3: lin3,
      city: cty,
      state: stte,
      zip: zp,
      primary: "false"
    }
  }});
  },
  updateMailingAddress(uid, oldline, lin1, lin2, lin3, cit, stte, zp){
    //Meteor.users.update(Meteor.userId(), {$pull: {"addresses":{"line1":oldline}}});
    Meteor.users.update({"_id":uid, "addresses.line1": oldline} , {$set: {"addresses.$":
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
  removeMailingAddress(uid, lin1){
    Meteor.users.update(uid, {$pull: {"addresses":{"line1":lin1}}});
  },
  toggleContactsView(){
    //console.log(Meteor.user().preferences.contacts_view);
    if(Meteor.user().preferences.contacts_view=="Tile"){
      Meteor.users.update({_id: Meteor.userId()},{$set: {"preferences.contacts_view": "List"}});
    }
    else {
      Meteor.users.update({_id: Meteor.userId()},{$set: {"preferences.contacts_view": "Tile"}});
    }
  },
  toggleContactsInfoBar(){
    var truefalse = !Meteor.user().preferences.contacts_infobar;
    Meteor.users.update({_id: Meteor.userId()},{$set: {"preferences.contacts_infobar": truefalse }});
  },
  toggleTicketsView(){
    //console.log(Meteor.user().preferences.contacts_view);
    if(Meteor.user().preferences.tickets_view=="Tile"){
      Meteor.users.update({_id: Meteor.userId()},{$set: {"preferences.tickets_view": "List"}});
    }
    else {
      Meteor.users.update({_id: Meteor.userId()},{$set: {"preferences.tickets_view": "Tile"}});
    }
  },
  toggleTicketsInfoBar(){
    var truefalse = !Meteor.user().preferences.tickets_infobar;
    Meteor.users.update({_id: Meteor.userId()},{$set: {"preferences.tickets_infobar": truefalse }});
  },
  setCalendarView(view){
    Meteor.users.update({_id: Meteor.userId()},{$set: {"preferences.calendar_view": view}});
  },
  openEventInfoBar(){
    Meteor.users.update({_id: Meteor.userId()},{$set: {"preferences.events_infobar": true }});
  },
  toggleEventsInfoBar(){
    var truefalse = !Meteor.user().preferences.events_infobar;
    Meteor.users.update({_id: Meteor.userId()},{$set: {"preferences.events_infobar": truefalse }});
  },
  toggleChurchesView(){
    //console.log(Meteor.user().preferences.contacts_view);
    if(Meteor.user().preferences.churches_view=="Tile"){
      Meteor.users.update({_id: Meteor.userId()},{$set: {"preferences.churches_view": "List"}});
    }
    else {
      Meteor.users.update({_id: Meteor.userId()},{$set: {"preferences.churches_view": "Tile"}});
    }
  },
  toggleChurchesInfoBar(){
    var truefalse = !Meteor.user().preferences.churches_infobar;
    Meteor.users.update({_id: Meteor.userId()},{$set: {"preferences.churches_infobar": truefalse }});
  },
  toggleGroupsInfoBar(){
    var truefalse = !Meteor.user().preferences.groups_infobar;
    Meteor.users.update({_id: Meteor.userId()},{$set: {"preferences.groups_infobar": truefalse}});
  },
  setGroupsView(id){
    Meteor.users.update({_id: Meteor.userId()},{$set: {"preferences.groups_view": id}});
  },
	toggleEmailsInfoBar(){
    var truefalse = !Meteor.user().preferences.emails_infobar;
    Meteor.users.update({_id: Meteor.userId()},{$set: {"preferences.emails_infobar": truefalse }});
  },

  updateDebriefDraft(evid, nts){
    Debriefs.update(
      {eid: evid, uid: Meteor.userId()},
      {$set: {notes: nts}}
    );
  },


  //Tags stuff  (not applying to the event only tag settings)
  newEventTag(name){
    Options.update({_id:"eventtags"},{$addToSet: {vals: name}});
  },
  deleteEventTag(name){
    Options.update({_id:"eventtags"},{$pull: {vals: name}});
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
