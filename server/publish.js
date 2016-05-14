Resolutions = new Mongo.Collection("resolutions");
Ethnicities = new Mongo.Collection("ethnicities");
Events = new Mongo.Collection("events");
Tickets = new Mongo.Collection("tickets");
Groups = new Mongo.Collection("groups");


Meteor.publish("allEvents", function(){
  return Events.find();
});

Meteor.publish("publishedEvents", function(){
  return Events.find({published: true});
});

Meteor.publish("thisuser", function(){
  return Meteor.users.find({_id : this.userId});
});

Meteor.publish("allEthnicities", function(){
  return Ethnicities.find();
});
