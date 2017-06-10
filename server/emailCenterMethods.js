Meteor.methods({
	// *******    Email Methods  ************
  newEmail(templateId, frm, recip){
    /* Args:
              recip: {
                users: [userIds],
                groups: [gids],
                emails: ["emails"]
              }
    */
    var template = Emails.findOne(templateId);
    return Emails.insert({
      uid: Meteor.userId(),
      sent: false,
      to: recip,
      from: frm,   // email string
      subject: template.subject,
      modules: template.modules,
      sent: false,
      when: new moment().add(2,"hours")._d,
      template: template._id,
      staged: false
    });
  },
  updateEmailSubject(emid, subj){
    Emails.update(emid, {$set: {subject: subj}});
  },
  updateEmailTo(emid, to){
    Emails.update(emid, {$set: {to: to}});
  },
  updateEmailFrom(emid, from){
    Emails.update(emid, {$set: {from: from}});
  },
  updateEmailWhen(emid, when){
    Emails.update(emid, {$set: {when: when}});
  },
  updateEmailStaged(emid, stg){
    Emails.update(emid, {$set: {staged: stg}});
  },
  sendEmail(emid){
    var email = Emails.findOne(emid);
    // This function processes everything and sends the email
    Emails.update(emid, {$set: {sent: true}});
    StagedEmails.remove({_id: emid});
  },
  stageEmail(emid){
    StagedEmails.insert({_id: emid});
  },
  newEmailTemplate(email, ttle){
    Emails.insert({
      title: ttle,
      to: email.to,
      from: email.from,
      subject: email.subject,
      content: email.content,
      isTemplate: true
    });
  },
	addModule(emid, type){
		Emails.update(
			{_id: emid},
			{$addToSet: {
				modules: newModule(type)
			}
		});
	},
	removeModule(emid, module){
		Emails.update(
			{_id: emid}, 
			{$pull: {
				modules: module
			}
		});
	},
	setModules(emid, modules){
		Emails.update(
			{_id: emid},
			{$set: {
				modules: modules
			}
		});
	}
});


let newModule = function( type ) {
	if(!Options.findOne({_id: "emailtypes", "vals.userAccessible": type})){
		Meteor.throw("Incorrect type");
	}
	let module = {
		title: false,
		type: type,
		eid: false,
		desc: false,
		img: false,
		layout: false
	}

	return module;
}
