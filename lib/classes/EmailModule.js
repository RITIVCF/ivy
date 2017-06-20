

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
	}

	hasTitle(){
		if(false){

		}
	}

	getModuleName(){
		Options.findOne("emailtypes").fetch().forEach((type)=>{
			if(this.type == type){
				return type.name;
			}
		});
		return "";
	}

	remove(){
		Meteor.call("removeModule", this.props.emid, this.props.module._id);
	}
}
