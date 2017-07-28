Meteor.methods({
	insertDebriefDraft(evid){
		let event = Events.findOne(evid);
		console.log(event);
		console.log(" ");
		let questions = DebriefQuestions.find(
			{
				$or: [
					{"types": {$in: event.tags}},
					{"types": []}
				]
			},
			{fields: {text:1, commentOpen: 1}}
		).fetch();
		console.log(questions);
    Debriefs.insert({
      questions: questions,
      eid: evid,
      uid: Meteor.userId()
    });
  }
});
