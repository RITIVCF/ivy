export default class Debrief {
	constructor(obj){
		Object.keys(obj).forEach((key)=>{
	    this[key] = obj[key];
	  });


		// this.questions = [
		// 	{
		// 		qid: "quidString",
		// 		value: int,
		// 		comment: ""
		// 	},
		// 	{
		// 		qid: "quidString",
		// 		value: int,
		// 		comment: ""
		// 	}
		// ];
	}

	initializeDraft(eid){
		Meteor.call("insertDebriefDraft", eid), function(error, result){
			if(error){
				console.log(error);
			}
			else{
				this._id = result;
			}
		};

		return this;
	}

	submit(){
		Meteor.call("submitDebriefDraft", this.eid, (error) => {
      if(error){
        console.log(error);
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

	editQuestion(i, value){
		this.questions[i].value = value;

		return this;
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
