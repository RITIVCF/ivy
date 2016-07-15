Meteor.methods({
  addResolution(resolution){
    Resolutions.insert({
        text: resolution,
        complete: false,
        createdAt: new Date()
    });
  },
  addMailingAddress(uid){
    Meteor.users.update(uid, {$addToSet: {"addresses":
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
  addEthnicity(ethnicity){
    Ethnicities.insert({
      name: ethnicity
    });
  },
  addBlankEvent(){
    var id = Events.insert({
      name: "New Event",     // Name  *publicly visab
      createdAt: new Date(),   //Date created
      published: false,    // published to the public calendar
      permUser: [],      // {UserID: true/false}   true=edit, false=view
      permGroup: [],     // {GroupID: true/false}    true=edit, false=view
      start: new Date(),    // date time object
      end: new Date(),      // Date time object
      workpad: "",      // text area for working
      description: "", // public description
      notes: "",   // the notes field for all the workspace
      location: "",  // text area for location
      host: "", // user ID of the host
      owner: Meteor.userId(), // user ID of the creator and owner. Can be changed.
      tags: [],     // tags to sort events by, not type as there can be more than one type potentially
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
  deleteEvent(eid){
    Events.remove({_id:eid});
  },
  updateName(uid, name){
    //console.log("Before: "+name);
    Meteor.users.update(uid, {$set: {"name": name}});

  },
  updatePhone(uid, phone){
    Meteor.users.update(uid, {$set: {"phone": phone}});
  },
  updateNewsletter(uid, status){
    Meteor.users.update(uid, {$set: {"newsletter": status}});
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
  updateEmail(uid, email){
    Meteor.users.update(uid, {$set: {"email": email}});  // use . notation to change nested documents
  },
  updateUserAffiliations(uid, tag,addremove){
    if(addremove){
      Meteor.users.update(uid,{$pull: {"affiliations":tag}});
    }
    else{
        Meteor.users.update(uid,{$addToSet: {"affiliations": tag}});
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
  updateUserIntl(uid, intl){
    Meteor.users.update(uid, {$set: {"intl": intl}}); // Change intl status
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
  updateEventName(eid,name){
    Events.update(eid,{$set: {"name": name}});
  },
  updateEventLocation(eid,location){
    Events.update(eid,{$set: {"location": location}});
  },
  updateEventWorkpad(eid,text){
    Events.update(eid,{$set: {"workpad": text}});
  },
  updateEventTags(eid,tags){
    Events.update(eid,{$set: {"tags": tags}});
  },
  updateEventReserved(eid,status){
    if(status){
      status = false;
    }
    else {
      status = true;
    }
    Events.update(eid,{$set: {"reserved": status}});
  },
  updateEventEVR(eid,status){
    if(status){
      status = false;
    }
    else {
      status = true;
    }
    Events.update(eid,{$set: {"evr": status}});
  },

  // Attendance stuff
  createAttendanceRecord(eid,uid,first){
    Events.update(eid,{$addToSet: {"attendees":{"_id":uid,"firsttime":first}}});
  },
  createRSVPRecord(eid,uid,rsvp){
    Events.update(eid,{$addToSet: {"rsvps":{"_id":uid,"rsvp":rsvp}}});
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
  deleteChurch(cid){
    Churches.remove({_id:cid});
  },
  toggleActiveChurch(cid,status){

    if(status){
      status = false;
    }
    else {
      status = true;
    }
    Churches.update(cid, {$set: {"active": status}});
  },
  updateChurchName(cid,text){
    Churches.update(cid,{$set: {"name": text}});
  },
  updateChurchURL(cid,text){
    Churches.update(cid,{$set: {"url": text}});
  }
})
