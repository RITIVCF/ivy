import {
	newEmail,
	updateEmailSubject,
	updateEmailTo,
	addUserEmailRecipient,
	setUserEmailRecipients,
	addGroupEmailRecipient,
	addEmailEmailRecipient,
	stageNewsletter,
	unstageNewsletter,
	changeNewsletterSendDateTime,
	sendToMe
} from '/lib/emails.js';
import {
	newEmailModule,
	setModuleDesc
} from '/lib/modules.js';

Meteor.methods({
	// *******    Email Methods  ************
  newEmail(templateId, frm, recip){
    let resultEmail = newEmail(Meteor.userId(), templateId, frm, recip);
		return resultEmail._id;
  },

  updateEmailSubject(emid, subj){
    updateEmailSubject(emid, subj);
  },
  addUserEmailRecipient(emid, newRecipient){
    addUserEmailRecipient(emid, newRecipient);
  },
	setUserEmailRecipients(emid, recipientArray){
		setUserEmailRecipients(emid, recipientArray);
	},
	addGroupEmailRecipient(emid, newRecipient){
		addGroupEmailRecipient(emid, newRecipient);
	},
	addEmailEmailRecipient(emid, newRecipient){
		addEmailEmailRecipient(emid, newRecipient);
	},
  updateEmailFrom(emid, from){
    Emails.update(emid, {$set: {from: from}});
  },
  updateEmailWhen(emid, when){
    changeNewsletterSendDateTime(emid, when);
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
    stageNewsletter(emid);
  },

	unstageEmail(emid){
		unstageNewsletter(emid);
	},

	stageNewsletter(emid){
		stageNewsletter(emid);
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
			{
				$push: {
					modules: newEmailModule(type)
				}
			}
		);
	},

	addCustomModule(emid, layout){
		Emails.update(
			{_id: emid},
			{
				$push: {
					modules: newEmailModule("custom", layout)
				}
			}
		);
	},

	removeModule(emid, moduleId){
		Emails.update(
			{_id: emid},
			{$pull: {
				"modules": {"_id": moduleId}
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

	moveModuleUp(emid, moduleIndex){
		let modules = Emails.findOne(emid).modules;
		let newIndex = moduleIndex - 1;
		if(newIndex < 0){ // If at initial position, don't move it
			newIndex = 0;
		}

		modules.move(moduleIndex, newIndex);

		Emails.update(
			{_id: emid},
			{$set: {
				modules: modules
			}}
		);


	},

	moveModuleDown(emid, moduleIndex){
		let modules = Emails.findOne(emid).modules;
		let newIndex = moduleIndex + 1;
		if(newIndex > modules.length){ //If at end, keep at end
			newIndex = modules.length;
		}

		modules.move(moduleIndex, newIndex);

		Emails.update(
			{_id: emid},
			{$set: {
				modules: modules
			}}
		);
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
		setModuleDesc(emid, moduleId, desc);
	},

	setModuleTitle(emid, moduleId, title){
		Emails.update(
			{_id: emid,
				"modules._id": moduleId},
			{$set: {"modules.$.title": title}}
		);
	},

	setModuleImg(emid, moduleId, imgURL){
		Emails.update(
			{
				_id: emid,
				"modules._id": moduleId
			},
			{
				$set: {"modules.$.img": imgURL}
			}
		);
	},

	setModuleEvent(emid, moduleId, eid){
		Emails.update(
			{
				_id: emid,
				"modules._id": moduleId
			},
			{
				$set: {"modules.$.eid": eid}
			}
		);
	},

	setModuleLabel(emid, moduleId, newLabel){
		Emails.update(
			{
				_id: emid,
				"modules._id": moduleId
			},
			{
				$set: {"modules.$.label": newLabel}
			}
		);
	},

	setModuleURL(emid, moduleId, newURL){
		Emails.update(
			{
				_id: emid,
				"modules._id": moduleId
			},
			{
				$set: {"modules.$.url": newURL}
			}
		);
	},

	setModuleButtonText(emid, moduleId, text){
		Emails.update(
			{
				_id: emid,
				"modules._id": moduleId
			},
			{
				$set: {"modules.$.": text}
			}
		);
  },
    
	sendToMe(emid) {
		sendToMe(emid, Meteor.userId());
	}

});
