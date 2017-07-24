export {
	loadUser
}

function loadUser(uid){
	let user = Meteor.users.findOne(uid);
	return new Contact(user);
}

export default class Contact {
	constructor(obj){
		Object.keys(obj).forEach((key)=>{
	    this[key] = obj[key];
	  });
	}

	isUser(){
		return Meteor.userId()==this._id;
	}

	getName(){
		if(!this.name){
	    return "-";
	  }
	  return this.name;
	}

	setName(name){
		Meteor.call('updateName', this._id, name);
	}

	getEmail(){
		if(!this.emails){
	    return "-";
	  }
		let email = this.emails[0].address;
	  return email;
	}

	setEmail(text){
		if(text==""){
	    window.alert("Please enter a valid email.");
	    return;
	  }
	  if(this.getEmail()!=text){
	    Meteor.call('updateUserEmail', this._id, this.emails[0].address, text, (error)=>{
	      if(error){
	        console.debug(error);
	        window.alert("Email Already exists.");
	      }
	    });
	  }
	}

	getPhone(){
		if(!this.phone){
	    return "-";
	  }
		let phone = this.phone;
		phone = phone.replace(/\D/g, '');
		phone = phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
	  return phone;
	}

	setPhone(text){
		Meteor.call('updatePhone', this._id, text);
	}

	isSignedUpForNewsletter(){
		return this.newsletter;
	}

	getNewsletter(){
		return this.newsletter;
	}

	setNewsletter(checked){
		Meteor.call('updateNewsletter', this._id, checked);
	}

	getBio(){
		if(!this.bio){
	    return "";
	  }
	  return this.bio;
	}

	setBio(bio){
		Meteor.call('updateBio', this._id, bio);
	}

	getMajor(){
		if(!this.major){
	    return "";
	  }
	  return this.major;
	}

	setMajor(text){
		Meteor.call('updateMajor', this._id, text);
	}

	getAffiliations(){
		if(!this.affiliations){
	    return [];
	  }
	  return this.affiliations;
	}

	setAffiliation(tag, checked){
		Meteor.call("updateAffiliationsTag", this._id, tag, checked);
	}

	getCommunityLifeTags(){
		if(!this.communitylife){
	    return [];
	  }
	  return this.communitylife;
	}

	addCommunityLifeTag(tag){
		Meteor.call("addCommunityLifeTag", this._id, tag);
	}

	removeCommunityLifeTag(tag){
		Meteor.call("removeCommunityLifeTag", this._id, tag);
	}

	getFunnelStatus(){
		let record = Funnel.find({_id: this._id}, {$limit: 1, $sort: {date: -1}}).fetch()[0];
	  if(record){
	    return record.status;
	  }
	  return "-";
	}

	setFunnelStatus(status){
		Meteor.call("updateStatus", this._id, status);
	}

	isMember(){
		return !!this.member;
	}

	getTicket(){
		if(!this.ticket){
	    return "";
	  }
	  return Tickets.findOne(this.ticket);
	}

	getTicketId(){
		if(!this.ticket){
	    return ""
	  }
	  return this.ticket;
	}

	hasTicket(){
		return !!this.ticket;
	}

	getHowHear(){
		if(!this.howhear){
	    return "";
	  }
	  return this.howhear;
	}

	getGradTerm(){
		if(!this.gradterm){
	    return "";
	  }
	  return this.gradterm;
	}

	setGradTerm(term){
		Meteor.call("updateGradTerm", this._id, term);
	}

	getCurrentYearLevel(){
		if(!this.curryear){
	    return "";
	  }
	  return this.curryear;
	}

	setCurrentYearLevel(year){
		Meteor.call("updateCurrYear", this._id, year);
	}

	getGender(){
		if(!this.gender){
	    return "";
	  }
	  return this.gender;
	}

	setGender(gender){
		Meteor.call("updateGender", this._id, gender);
	}

	getAddresses(){
		if(!this.addresses){
	    return [];
	  }
	  return this.addresses;
	}

	addAddress(lin1, lin2, lin3, cit, state, zip){
		Meteor.call('addMailingAddress',
	    this._id,
	    lin1,
	    lin2,
	    lin3,
	    cit,
	    state,
	    zip,
	    function(error, result){
	    if(error){
	      window.alert("Something went wrong. Please send this to system admin:\n\n", error);
	      console.debug(error.reason);
	      return;
	    }
	  });
	}

	getStatus(){
		let record = Status.find({_id: this._id}, {$limit: 1, $sort: {date: -1}}).fetch()[0];
		if(record){
			return record.status;
		}
		return false;
	}

	isPresent(){
		return this.status == "Present";
	}

	isAbsent(){
		return this.status == "Absent";
	}

	isOutOfScope(){
		return this.status == "Out of Scope";
	}

	isGraduated(){
		return this.status == "Graduated";
	}

	isAdmin(){
		return this.status == "Admin";
	}

	isDeleted(){
		return this.status == "Deleted";
	}

	remove(){
		if(checkPermission("removecontact")){
	    Meteor.call("removeContact", this._id);
	  }
	}

}
