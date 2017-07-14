
export default class Email {
	constructor(obj){
		if(!obj){
	    return false;
	  }
	  Object.keys(obj).forEach((key)=>{
	    this[key] = obj[key];
		});
	}

	isStaged(){
		return this.status == "staged";
	}

	isSent(){
		return this.status == "sent";
	}

	isDraft(){
		return this.status == "draft";
	}

}
