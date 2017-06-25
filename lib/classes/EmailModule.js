

export default class EmailModule {
	constructor(obj){
		Object.keys(obj).forEach((key)=>{
	    this[key] = obj[key];
	  });

		this.titleTypes = [
			"eventpromotion",
			"custom",
			"text"
		];

		this.descTypes = [
			"intro",
			"custom",
			"eventpromotion",
			"text"
		];
	}

	isDescEditable(){
		return this.descTypes.includes(this.type);
	}

	setEmail(emailId){
		this.emailId = emailId;
	}

	saveTitle(newTitle){
		if(this.userCanEditTitle()){
			Meteor.call("setModuleTitle", this.emailId, this._id, newTitle);
		}
	}

	isTitleEditable(){
		return this.titleTypes.includes(this.type);
	}

	hasTitle(){
		return !!this.title;
	}

	getTitle(){
		if(this.hasTitle()){
			return this.title;
		}
		else{
			return "";
		}
	}

	getModuleName(){
		let name = "";
		Options.findOne("emailtypes").vals.forEach((type)=>{
			if(this.type == type.value){
				name = type.name;
			}
		});
		return name;
	}

	remove(){
		Meteor.call("removeModule", this.emailId, this._id);
	}
}
