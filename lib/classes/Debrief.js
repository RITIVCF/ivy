export default class Debrief {
	constructor(eid){
		this.load(eid);

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

	load(eid){
		let debriefs = Debriefs.find({eid: eid, uid: Meteor.userId()}).fetch();
		if(debriefs.length != 1){
			this.initializeDraft(eid);
		}
		else{
			let debrief = debriefs[0];
			Object.keys(debrief).forEach((key)=>{
		    this[key] = debrief[key];
		  });
		}
		return this;
	}

	initializeDraft(eid){
		Meteor.call("insertDebriefDraft", eid), function(error, result){
			if(error){
				console.log(error);
			}
			else{
				this._id = result;
				//this.load(eid);
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
