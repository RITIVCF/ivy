
Meteor.methods({
  addNewWorkpadTab(eid){
    var newname="New Sheet";
    //Find some way to check if New Sheet was used and if so keep appending #s
    // if(Events.find().fetch().length>0){
    //   newname="New Sheet 2";
    // }
    Events.update({_id: eid},{$addToSet: {workpad:
      {
        name: newname,
        content: "",
        lock: false
      }
    }});
  },
  changeTabName(eid, pad, newvalue){
    Events.update({_id: eid, "workpad.name": pad}, {$set: {"workpad.$.name": newvalue}});
  },
  updateEventWorkpad(eid, pad, text){
    Events.update({_id: eid, "workpad.name": pad},{$set: {"workpad.$.content": text}});
  },
  EventWorkpadLock(eid, pad, status){
    Events.update({_id: eid, "workpad.name": pad}, {$set: {"workpad.$.lock": status}});
  }
})
