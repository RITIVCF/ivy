import { createNewEventFollowUpEmail } from '/lib/emails.js';
import {
	canUserEditEvent,
	createRecurringEvents,
	setPublishAllRecurEvents,
	deleteAllRecurEvents,
	setEventGroup } from '/lib/events.js';
import { addTicket } from '/lib/tickets.js';
import Contact from '/lib/classes/Contact.js';
import { createNewUser } from '/lib/users.js';


Meteor.methods({
  /// Takes in a sign in object
  /// For existing users:
  ///       eid str,
  ///       uid str,
  ///       new = false
  /// For new users:
  ///       eid str,
  ///       new = true,
  ///       name str,
  ///       email str,
  ///       phone str,
  ///       major str,
  ///       howhear str,
  ///       learnmore  bool
  handleEventSignIn(signin){
		Meteor.defer(()=>{
			// If not new, sign in and skip
	    if(!signin.new){
	      addAttendanceRecord(signin);
	    }
	    else{
	      // Create new user and get uid
				signin.name = signin.name[0].toUpperCase() + signin.name.slice(1);
				let userDoc = {
					name: signin.name,
	        email: signin.email,
	        phone: signin.phone,
	        major: signin.major,
	        howhear: signin.howhear
				}
	      signin.uid = createNewUser(userDoc);

	      // Create follow up ticket
	      addAttendanceTicket(signin.eid, signin.uid);

	      addAttendanceRecord(signin);

	      if(signin.newsletter){
	        Meteor.call("updateNewsletter", signin.uid, true);
	      }
	      if(signin.learnmore){
	        Meteor.call("addLearnMoreTicket", signin.uid);
	      }

	    }

			if( signin.new ){
				createNewEventFollowUpEmail(signin.eid, signin.uid);
			}
		});

  },

	createEventRecurrence(eid, date, groupId = false){
		let event = Events.findOne(eid);

		// if user has edit permission
		// else do nothing
		if(canUserEditEvent(event)){
			createRecurringEvents(eid, date);
			if(groupId){
				setEventGroup(eid, groupId);
			}
		}
	},

	deleteAllRecurEvents(eid){
		let event = Events.findOne(eid);

		if(canUserEditEvent(event)){
			deleteAllRecurEvents(event.recurId);
		}
	},

	publishAllRecurEvents(eid){
		let event = Events.findOne(eid);

		if(canUserEditEvent(event)){
			setPublishAllRecurEvents(event.recurId, true);
		}
	},

	unpublishAllRecurEvents(eid){
		let event = Events.findOne(eid);

		if(canUserEditEvent(event)){
			setPublishAllRecurEvents(event.recurId, false);
		}
	}

});

  /// Takes an input object
  /// For existing users:
  ///       eid str,
  ///       uid str
  /// For new users:
  ///       eid str,
  ///       uid str,
  ///       first bool,
  ///       learnmore bool
  addAttendanceRecord = function(record){
    if(!Events.findOne({"attendees._id": record.uid, _id: record.eid})){
      Events.update(record.eid,
        {$addToSet: {"attendees":
          {
            "_id": record.uid,
            "firsttime": record.new,
            "more": record.learnmore,
            "timestamp": new Date()
          }
        }}
      );
			calculateFunnelStatus(record.uid);
    }
  }

  addAttendanceTicket = function(eid, uid){

    let evname = Events.findOne(eid).name;
    let user = new Contact(Meteor.users.findOne(uid));
    let desc = evname+"\n"+user.getName()+"\n"+user.getEmail()+"\n"+user.getPhone()+"\n"+user.getHowHear();
		let subject = "New Contact: " + user.getName()

    let tktId = addTicket({
			subject: subject,
			description: desc,
			type: "Contact",
			customer: uid,
			eid: eid
		})
    // Sets
    Meteor.users.update(user._id, {$set: {ticket: tktId}});
    return tktId;
  }
