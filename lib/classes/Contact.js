Contact = function Contact (obj) {
  Object.keys(obj).forEach((key)=>{
    this[key] = obj[key];
  });
}

Contact.prototype.isUser = function () {
  return Meteor.userId()==this._id;
}

Contact.prototype.getName = function () {
  if(!this.name){
    return "-";
  }
  return this.name;
}

Contact.prototype.setName = function (nme) {
  Meteor.call('updateName', this._id, nme);
}

Contact.prototype.getEmail = function () {
  if(!this.emails){
    return "-";
  }
  return this.emails[0].address;
}

Contact.prototype.setEmail = function (text) {
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

Contact.prototype.getPhone = function () {
  if(!this.phone){
    return "-";
  }
  return this.phone;
}

Contact.prototype.setPhone = function (text) {
  Meteor.call('updatePhone', this._id, text);
}

Contact.prototype.isSignedUpForNewsletter = function () {
	return this.newsletter ? "Yes" : "No";
}

Contact.prototype.getNewsletter = function () {
  return this.newsletter;
}

Contact.prototype.setNewsletter = function (checked) {
  Meteor.call('updateNewsletter', this._id, checked);
}

Contact.prototype.getBio = function () {
  if(!this.bio){
    return "";
  }
  return this.bio;
}

Contact.prototype.setBio = function (bio) {
  Meteor.call('updateBio', this._id, bio);
}

Contact.prototype.getMajor = function () {
  if(!this.major){
    return "";
  }
  return this.major;
}

Contact.prototype.setMajor = function (text) {
  Meteor.call('updateMajor', this._id, text);
}

Contact.prototype.getAffiliations = function () {
  if(!this.affiliations){
    return [];
  }
  return this.affiliations;
}

Contact.prototype.setAffiliation = function (tag, checked) {
  Meteor.call("updateAffiliationsTag", this._id, tag, checked);
}

Contact.prototype.getCommunityLifeTags = function () {
  if(!this.communitylife){
    return [];
  }
  return this.communitylife;
}

Contact.prototype.addCommunityLifeTag = function (tag) {
  Meteor.call("addCommunityLifeTag", this._id, tag);
}

Contact.prototype.removeCommunityLifeTag = function () {
  Meteor.call("removeCommunityLifeTag", this._id, tag);
};

Contact.prototype.getStatus = function () {
  // if(!this.status){
  //   return "";
  // }
  // return this.status;
  let record = Funnel.find({_id: this._id}, {$limit: 1, $sort: {date: -1}}).fetch()[0];
  if(record){
    return record.status;
  }
  return "-";
}

Contact.prototype.setStatus = function (stat) {
  Meteor.call("updateStatus", this._id, stat);
}

Contact.prototype.isMember = function () {
  return this.member;
}

Contact.prototype.getTicket = function () {
  if(!this.ticket){
    return "";
  }
  return Tickets.findOne(this.ticket);
}

Contact.prototype.getTicketId = function () {
  if(!this.ticket){
    return ""
  }
  return this.ticket;
}

Contact.prototype.hasTicket = function () {
  return !!this.ticket;
}

Contact.prototype.getHowHear = function () {
  if(!this.howhear){
    return "";
  }
  return this.howhear;
}

Contact.prototype.getGradTerm = function () {
  if(!this.gradterm){
    return "";
  }
  return this.gradterm;
};

Contact.prototype.setGradTerm = function (term) {
  Meteor.call("updateGradTerm", this._id, term);
};

Contact.prototype.getCurrentYearLevel = function () {
  if(!this.curryear){
    return "";
  }
  return this.curryear;
};

Contact.prototype.setCurrentYearLevel = function (year) {
  Meteor.call("updateCurrYear", this._id, year);
};

Contact.prototype.getGender = function () {
  if(!this.gender){
    return "";
  }
  return this.gender;
};

Contact.prototype.setGender = function (gender) {
  Meteor.call("updateGender", this._id, gender);
};

Contact.prototype.getAddresses = function () {
  if(!this.addresses){
    return [];
  }
  return this.addresses;
}

Contact.prototype.addAddress = function (lin1, lin2, lin3, cit, state, zip) {
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

Contact.prototype.remove = function () {
  if(checkPermission("removecontact")){
    Meteor.call("removeContact", this._id);
  }
}
