Meteor.methods({
  setDebriefQuestions(str){
    Options.update("debriefquestions", {$set: {val: str}});
  },
  updateEventDebrief(eid, notes){
    Events.update(eid, {$set: {"debrief.notes": notes}});
  },
	addDebriefQuestion(text, type, qid=""){
		let question = {
			text: text,
			type: type,
			types: [],
			sub: [],
			commentOpen: false,
			submitted: false,
			deleted: false
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
	deleteDebriefQuestion(qid){
		DebriefQuestions.update({_id: qid}, {$set: {deleted: true}});
	},
	addDebriefQuestionTag(qid, tag){
		DebriefQuestions.update({_id: qid}, {$addToSet: {types: tag}});
	},
	removeDebriefQuestionTag(qid, tag){
		DebriefQuestions.update({_id: qid}, {$pull: {types: tag}});
	}
});
