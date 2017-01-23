SyncedCron.start();
SyncedCron.add({
  name: 'CalculateFunnel',
  schedule: function(parser) {
    // parser is a later.parse object
    return parser.recur().on("23:59:59").time();
  },
  job: function() {
    var result = Contacts.aggregate([{$group: {_id: "$status", count: {$sum: 1}}}]);
    var rst ={};
    result.forEach((status)=>{
      rst[status._id] = status.count;
    });
    rst.timestamp = new Date();
    FunnelHistory.insert(rst);
  }
});
SyncedCron.add({
  name: 'BackupContactsAttendance',
  schedule: function(parser) {
    // parser is a later.parse object
    return parser.recur().on("00:00:59").time();
  },
  job: function() {
    ContactsBackup.insert({contacts:Meteor.users.find().fetch(), timestamp: new Date()});
    EventsAttendanceBackup.insert({events: Events.find({},{name: 1, start: 1, attendees: 1}).fetch(), timestamp: new Date()});
  }
});

function getMyGroupsIDs(){
  var grps = Groups.find({users: this.userId}).fetch();
  console.log(grps);
	var ids = [];
	grps.forEach(function(group){
		ids.push(group._id);
	});
  return ids;
}

checkPermission = function(id,uid){
  //console.log(this.userId);
	var grps = Groups.find({users: uid}).fetch();
	var ids = [];
	grps.forEach(function(group){
		ids.push(group._id);
	});

	return PagePermissions.find({_id:id,groups: {$in: ids}}).fetch().length>0;
}

SyncedCron.add({
  name: 'updateFunnel',
  schedule: function(parser) {
    // parser is a later.parse object
    return parser.recur().on("00:02:00").time();
  },
  job: function() {
    var intervl = 7; //In days
  	var period = 4; //In intervls
    var percentage = .5; //In decimal form
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
      Events.find({
  			start:{
  				$gte : startDate,//startDate.setDate(startDate.getDate() - intervl),
  				$lt : endDate
  			},
        published: true
  		}).fetch().forEach((event)=>{
        events.push(event._id);
      });
      eventsPerInterval.push(events);
  		//endDate.setDate(endDate.getDate() - intervl);
      console.log("endDate: ", endDate);
      console.log("startDate: ", startDate);
      endDate = startDate;//new moment(endDate.toISOString()).subtract(intervl,"days")._d
      //console.log("New endDate: ", endDate);
  	}
    var mults = Groups.findOne("multipliers").users;
    //console.log("Users: ", Meteor.users.find({deleted: {$ne: true}}).fetch());
    //for (var i in Meteor.users.find({deleted: {$ne: true}}).fetch()) {
    Meteor.users.find({deleted: {$ne: true}}).fetch().map((user)=>{
      var uid = user._id;
      console.log(uid, user.name);
      // console.log("Is Leader: ", Groups.find({leader: uid}).fetch());
      //if (uid in mults) {
      if(Groups.find({_id: "multipliers", users: uid}).fetch().length>0){
        // console.log(user.name, " Is multiplier");
        Meteor.users.update({_id : uid}, {$set : {status : "Multiplier"}});
      } else if (Groups.find({leader : uid}).fetch().length > 0) {
        // console.log(user.name, " Is leader");
        Meteor.users.update({_id : uid}, {$set : {status : "Leader"}});
      } else if (Groups.find({type : "Team", users : uid}).fetch().length > 0) {
        //console.log(user.name, " Is server");
        Meteor.users.update({_id : uid}, {$set : {status : "Server"}});
      } else if (user.member) {
        // console.log(user.name, " Is member");
        Meteor.users.update({_id : uid}, {$set : {status : "Member"}});
      } else {
        // console.log(user.name, " Is visitor or crowd");
  			var count = 0;
        //console.log(eventsPerInterval);
        eventsPerInterval.forEach((intvl)=>{
          console.log(intvl);
          if(Events.find({_id: {$in: intvl}, "attendees._id": uid}).fetch().length>0){
            count++
          }
        });

  			// for (var ls in eventsPerInterval) {
  			// 	if (ls.find({attendees : uid}).fetch().length > 0) {
  			// 		count++;
  			// 	}
  			// }
        if (count/period >= percentage) {
          // console.log(user.name, " Is visitor");
          Meteor.users.update({_id : uid}, {$set : {status : "Visitor"}});
        } else {
          // console.log(user.name, " Is crowd");
          Meteor.users.update({_id : uid}, {$set : {status : "Crowd"}});
        }
      }
      console.log(user.name, " end.");
    });
  }
  }
});
