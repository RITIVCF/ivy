export default class Debrief {
	constructor(eid){
		return this.load(eid);
	}

	load(eid){
		let debrief = Debriefs.findOne({eid: eid, uid: Meteor.userId()});
		if(!debrief){
			return this;
		}
		Object.keys(debrief).forEach((key)=>{
			this[key] = debrief[key];
		});
		return this;
	}

	initializeDraft(eid){
		Meteor.call("insertDebriefDraft", eid), function(error, result){
			if(error){
				console.error(error);
			}
		};

		return this;
	}

	submit(){
		Meteor.call("submitDebriefDraft", this.eid, (error) => {
      if(error){
        console.error(error);
      }else{
        Materialize.toast("Debrief submitted successfully", 4000);
      }
    });

		return this;
	}

	addQuestion(question){
		this.questions.push(question);

		return this;
	}

	updateQuestionValue(i, value){
		this.questions[i].value = value;
		Meteor.call("updateDraftQuestions", this._id, this.questions);
		return this;
	}

	updateQuestionComment(i, comment){
		this.questions[i].comment = comment;
		Meteor.call("updateDraftQuestions", this._id, this.questions);
	}

	getQuestions(){
		if(!this.questions){
			return [];
		}
		return this.questions;
	}

	saveDraft(){
		Meteor.call("updateDebriefDraft", this.eid, this.questions);

		return this;
	}
}
