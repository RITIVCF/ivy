Meteor.methods({
  setDebriefQuestions(str){
    Options.update("debriefquestions", {$set: {val: str}});
  },
  updateEventDebrief(eid, notes){
    Events.update(eid, {$set: {"debrief.notes": notes}});
  },
	updateDraftQuestions(debriefId, questions){
		Debriefs.update({_id: debriefId},{$set: {questions: questions}});
	},
	updateDraftQuestionComment(debriefId, questionId, comment){
		Debriefs.update({_id: debriefId, "questions.$._id": questionId},{$set: {"question.comment": comment}});
	},


	addDebriefQuestion(text, type, qid=""){
		let question = {
			text: text,
			type: type,
			types: [],
			sub: [],
			commentOpen: false,
			submitted: false,
			active: true
		};

		if(!qid){
			DebriefQuestions.insert(question);
		}
		else{
			DebriefQuestions.update({_id: qid}, {$addToSet: {sub: question}});
		}

	},
	changeDebriefQuestionText(qid, text){
		DebriefQuestions.update({_id: qid}, {$set: {text: text}});
	},
	setDebriefQuestionCommentOpenClosed(qid, commentOpen){
		DebriefQuestions.update({_id: qid}, {$set: {commentOpen: !commentOpen}});
	},
	inactivateDebriefQuestion(qid){
		DebriefQuestions.update({_id: qid}, {$set: {active: false}});
	},
	activateDebriefQuestion(qid){
		DebriefQuestions.update({_id: qid}, {$set: {active: true}});
	},
	addDebriefQuestionTag(qid, tag){
		DebriefQuestions.update({_id: qid}, {$addToSet: {types: tag}});
	},
	removeDebriefQuestionTag(qid, tag){
		DebriefQuestions.update({_id: qid}, {$pull: {types: tag}});
	},

	submitDebriefDraft(evid){
    var debrief = Debriefs.findOne({eid: evid, uid: Meteor.userId()});

    Events.update(
      {_id: evid},
      {$set: {debrief: debrief, status: "Reviewed"}}
    );
    Debriefs.remove({eid: evid});
  },
});
