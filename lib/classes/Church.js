Church = function Church (obj) {
  if(!obj){
    return false;
  }
  Object.keys(obj).forEach((key)=>{
    this[key] = obj[key];
  });
}

Church.prototype.getName = function () {
  if(!this.name){
    return "-"
  }
  return this.name;
}

Church.prototype.setName = function (nme) {
  Meteor.call("updateChurchName", this._id, nme);
}

Church.prototype.getTimes = function () {
  if(!this.times){
    return [];
  }
  return this.times;
}

Church.prototype.addTime = function () {
  Meteor.call('addChurchTime', this._id);
}

Church.prototype.updateTime = function (i, day, time) {
  Meteor.call("updateChurchTime", this._id,
   i,
   day,
   time);
}

Church.prototype.removeTime = function (day, time) {
  Meteor.call("removeChurchTime", this._id, day, time);
}

Church.prototype.getURL = function () {
  if(!this.url){
    return "";
  }
  return this.url;
}

Church.prototype.setURL = function (url) {
  Meteor.call("updateChurchURL", this._id, url);
}

Church.prototype.getContacts = function () {
  if(!this.contacts){
    return []
  }
  return this.contacts;
}

Church.prototype.addContact = function (id) {
  Meteor.call("addChurchContact",this._id, id);
}

Church.prototype.removeContact = function (id) {
  Meteor.call("removeChurchContact", this._id, id);
}

Church.prototype.toggleActive = function () {
  Meteor.call("toggleActiveChurch", this._id, this.active);
}

Church.prototype.isActive = function () {
  return this.active;
}

Church.prototype.remove = function () {
  Meteor.call('deleteChurch', this._id);
}
