import { createNewEventFollowUpEmail } from '/lib/emails.js';
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

		//calculateFunnelStatus(signin.uid);

    setupStatusJobs(signin.uid);

		createNewEventFollowUpEmail(signin.eid, signin.uid);


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
        ret = Counters.findOne("ticketID");
    Counters.update({_id:"ticketID"}, {$inc: {seq: 1}});
    let evname = Events.findOne(eid).name;
    let user = new Contact(Meteor.users.findOne(uid));
    let desc = evname+"\n"+user.getName()+"\n"+user.getEmail()+"\n"+user.getPhone()+"\n"+user.getHowHear();
    var tktId = Tickets.insert({
      ticketnum: ret.seq,
      subject: "New Contact: " + user.getName(),
      description: desc,
      assignedgroup: Options.findOne("ticketcontact").gid,
      assigneduser: "",
      customer: uid,  // Affected, or "customer" user
      status: "Open",
      type:"Contact",
      evreqtype: "",
      eid: eid,
      activities: [],
      createdAt: new Date(),
      submittedby: "Ivy System",
      lastUpdated: new Date()
    });
    // Sets
    Meteor.users.update(user._id, {$set: {ticket: tktId}});
    return tktId;
  }
