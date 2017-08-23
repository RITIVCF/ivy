Meteor.methods({
	insertDebriefDraft(evid){
		let event = Events.findOne(evid);
		let questions = DebriefQuestions.find(
			{
				$or: [
					{"types": {$in: event.tags}},
					{"types": []}
				],
				active: true
			},
			{fields: {text:1, commentOpen: 1}}
		).fetch();
    Debriefs.insert({
      questions: questions,
      eid: evid,
      uid: Meteor.userId()
    });
  }
});
