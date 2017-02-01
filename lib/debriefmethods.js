Meteor.methods({
  setDebriefQuestions(str){
    Options.update("debriefquestions", {$set: {val: str}});
  },
  updateEventDebrief(eid, notes){
    Events.update(eid, {$set: {"debrief.notes": notes}});
  }
});
