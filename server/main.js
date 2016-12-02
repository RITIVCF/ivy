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

function getMyGroupsIDs(){
  var grps = Groups.find({users: this.userId}).fetch();
  console.log(grps);
	var ids = [];
	grps.forEach(function(group){
		ids.push(group._id);
	});
  return ids;
}
