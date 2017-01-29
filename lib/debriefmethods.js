Meteor.methods({
  setDebriefQuestions(str){
    Options.update("debriefquestions", {$set: {val: str}});
  }
});
