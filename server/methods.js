Meteor.methods({
  addResolution(resolution){
    Resolutions.insert({
        text: resolution,
        complete: false,
        createdAt: new Date()
    });
  },
  addEthnicity(ethnicity){
    Ethnicities.insert({
      name: ethnicity
    });
  },
  addBlankEvent(){
    var id = Events.insert({
      name: "New Event",     // Name  *publicly visable
      createdAt: new Date(),   //Date created
      published: false,    // published to the public calendar
      permUser: [],      // {UserID: true/false}   true=edit, false=view
      permGroup: [],     // {GroupID: true/false}    true=edit, false=view
      start: "",    // date time object
      end: "",      // Date time object
      description: "", // public description
      notes: "",   // the notes field for all the workspace
      location: "",  // text area for location
      host: "", // user ID of the host
      owner: "", // user ID of the creator and owner. Can be changed.
      tags: [],     // tags to sort events by, not type as there can be more than one type potentially
      notes: [],    // This is an array of note objects  {note: "text", createdAt: "DateTime", createdBy: "user ID"}
      attachements: [],  // This is an array of text objects pointing to different attachements
      attendees: [],     // This is an array of user Ids of people who attended
      rsvps: [],         // This is an array of {userId: , rsvp: [yes, no, interested]} of people who RSVPed to this event (Mostly for conference sign ups and such)
      pic: ""   // pointer to image location, less we deem sending pictures to the database better
    });
    return id;
  },
  updateName(name){
    console.log("Before: "+name);
    Meteor.users.update(Meteor.userId(), {$set: {"profile.name": name}});

  },
  updateEmail(email){
    console.log("Email:"+email);
    Meteor.users.update(Meteor.userId(), {$set: {"emails[0].address": email}});  // use . notation to change nested documents
  },
  updateEthnicity(ethn){
    Meteor.users.update(Meteor.userId(), {$set: {"ethnicity": ethn}});
  },
  toggleInternational(intl){
    if(intl){
      Meteor.users.update(Meteor.userId(), {$set: {"ethnicity": ""}}); //If international, clear ethnicity
    }
    Meteor.users.update(Meteor.userId(), {$set: {"intl": !intl}}); // Change intl status
  }
})
