
export default class Event {
	constructor(obj){
		if(!!obj){
			Object.keys(obj).forEach((key)=>{
		    this[key] = obj[key];
		  });
		}
	}

	isReviewed(){
		return this.status == "Reviewed";
	}

	isPublished(){
		return (this.status == "Published")||this.isReviewed();
	}

	isUnpublished(){
		return this.status == "Unpublished";
	}

	getOwner(){
		return this.owner;
	}


}
