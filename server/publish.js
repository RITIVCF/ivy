Resolutions = new Mongo.Collection("resolutions");
Ethnicities = new Mongo.Collection("ethnicities");
Events = new Mongo.Collection("events");
Tickets = new Mongo.Collection("tickets");
Groups = new Mongo.Collection("groups");
Churches = new Mongo.Collection("churches");

Meteor.publish("allEvents", function(){
  return Events.find();
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

Meteor.publish("allUsers", function(){
  const options = {
    fields: {
      name: 1,
      email: 1,
      phone: 1
    }
  }
  return Meteor.users.find({}, options);
})

Meteor.publish("publishedEvents", function(){
  return Events.find({published: true});
});

Meteor.publish("oneEvent", function(eid){
  return Events.findOne(eid);
});

Meteor.publish("SGs", function(){
  return Groups.find({type:"Small Group"});
})

Meteor.publish("thisuser", function(){
  return Meteor.users.find({_id : this.userId});
});

Meteor.publish("allEthnicities", function(){
  return Ethnicities.find();
});

Meteor.publish("allChurches", function(){
  return Churches.find();
});

Meteor.publish("activeChurches", function(){
  return Churches.find({active: true});
});

/*  User fields */
Meteor.publish("userSelf", function(uid){

    const selector = {
      _id: uid
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
    ethnicity: 1,
    gradterm: 1,
    curryear: 1,
    member: 1
     }
  }
  return Meteor.users.find(selector, options);
});
