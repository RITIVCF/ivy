
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
  changeTabName(eid, name, newvalue){
    Events.update({_id: eid, "workpad.name": name}, {$set: {"workpad.$.name": newvalue}});
  },
  updateEventWorkpad(eid, pad, text){
    Events.update({_id: eid, "workpad.name": pad},{$set: {"workpad.$.content": text}});
  },
  EventWorkpadLock(eid, pad, status){
    Events.update({_id: eid, "workpad.name": pad}, {$set: {"workpad.$.lock": status}});
  },
  eventRequestPerm(eid){
    if(!this.isSimulation){
      console.log("Event ID: ", eid);
      var ev = Events.findOne(eid);
      console.log("Event Name: ", ev.name);
      console.log("Event: ", ev);
      console.log("Leader ID: ", ev.owner);
      var ldr = Meteor.users.findOne(ev.owner);
      console.log("Leader: ", ldr.name);
      Email.send({
        to: ldr.emails[0].address,
        from: "Ivy Information System <ivcf@rit.edu>",
        replyTo: Meteor.user().emails[0].address,
        subject: "New Event Permission Request: " + ev.name,
        html: "<p>"+Meteor.user().name+" has requested access to <b>"+ev.name+"</b>. Use the buttons below to respond. You can respond to this email to ask about the request.</p><br/>"
          + "<a href='"+process.env.ROOT_URL+"events/workspace/view/"+ eid +"/"+ Meteor.userId() +"'><button>View</button></a>"
          + "<a href='"+process.env.ROOT_URL+"events/workspace/edit/"+ eid +"/"+ Meteor.userId() +"'><button>Edit</button></a>"
          + "<p>- Ivy Information System</p>"
      });
    }
  },
  getEvent(eid){
    return Events.findOne(eid);
  }
})
