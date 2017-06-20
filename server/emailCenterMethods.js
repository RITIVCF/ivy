import { Random } from 'meteor/random';

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
			{$push: {
				modules: newModule(type)
			}
		});
	},

	removeModule(emid, moduleId){
		Emails.update(
			{_id: emid},
			{$pull: {
				"modules._id": moduleId
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
	},

	setModuleField(emid, moduleId, field, value){
		let update = {};
		update["modules.$."+field] = value;
		Emails.update(
			{
				_id: emid,
				"modules._id": moduleId
			},
			{
				$set: update
			}
		)
	},

	setModuleDesc(emid, moduleId, desc){
		Emails.update(
			{
				_id: emid,
				"modules._id": moduleId
			},
			{$set: {"modules.$.desc": desc}}
		);
	},

	setModuleTitle(emid, moduleId, title){
		Emails.update(
			{_id: emid,
				"modules._id": moduleId},
			{$set: {"modules.$.title": title}}
		);
	}
});

let newModule = function( type ) {
	if(!Options.findOne({_id: "emailtypes", "vals.value": type})){
		Meteor.Error("Incorrect type");
	}
	let module = {
		_id: Random.id(25),
		title: "",
		type: type,
		eid: "",
		desc: "",
		img: "",
		layout: ""
	}

	return module;
}

export {
	newModule
};
