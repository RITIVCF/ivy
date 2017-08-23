

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
			"text",
			"becomeamember",
			"getinvolved"
		];

		this.eventTypes = [
			"custom"
		];

		this.URLTypes = [
			"custom"
		];

		this.imgTypes = [
			"largegroup",
			"core",
			"custom",
			"conference"
		];
	}

	isLabelEditable(){
		return this.type == "custom";
	}

	isDescEditable(){
		return (
			this.descTypes.includes(this.type) &&
			!["cta"].includes(this.layout)
		);
	}

	isEventEditable(){
		return (this.eventTypes.includes(this.type) && this.layout=="feature");
	}

	isURLEditable(){
		return (this.URLTypes.includes(this.type) && this.layout=="cta");
	}

	isImgEditable(){
		return (
			this.imgTypes.includes(this.type) &&
			["feature","thumbnail","banner"].includes(this.layout)
		);
	}

	setEmail(emailId){
		this.emailId = emailId;
		return this;
	}

	saveTitle(newTitle){
		if(this.userCanEditTitle()){
			Meteor.call("setModuleTitle", this.emailId, this._id, newTitle);
		}
		return this;
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
		return this.getLabel();
	}

	getLabel(){
		return this.label;
	}

	getImageURL(){
		return this.img;
	}

	getActionURL(){
		return this.url;
	}

	getLayout(){
		return this.layout;
	}

	getEventID(){
		return this.eid;
	}

	remove(){
		Meteor.call("removeModule", this.emailId, this._id);
		return this;
	}
}
