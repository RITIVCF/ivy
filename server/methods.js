Meteor.methods({
  sendEventServiceRequest(uid,eid,pos){
    var contact = Contacts.findOne(Meteor.users.findOne(uid));
    var event = Events.findOne(eid);
    this.unblock();

    Email.send({
      to: contact.email,
      from: "Ivy Information System",
      subject: "New Event Service Request: " + event.name + " - " +pos,
      text: "<p>Dear "+ contact.name + "</p><p>You have been requested to serve in the position of "
      + pos + " for the event " + event.name + " on " + moment(event.start).format("Do MMM YY") + " at "
      + moment(event.start).format("HH:mmA")
      + ". You can view this request on the Ivy events page: "
      + "<a href='"+process.env.ROOT_URL+"/events'>Event Summary</a>, or you can reply with the buttons below.</br></br> "
      + "<a href='"+process.env.ROOT_URL+"/events/servicerequests/accept/" + eid + "/"+uid+"'><button color='green'>Accept</button></a>"
      + "<a href='"+process.env.ROOT_URL+"/events/servicerequests/decline/" + eid + "/" +uid+"'><button color='red'>Decline</button></a>"
    });
  },
  contactEmailConfirmation(contact){
    Email.send({
      to: contact.email,
      from: "Ivy Information System",
      subject: "Account Creation Confirmation Email",
      text: "<p>Dear "+ contact.name + "</p><br/><p>Please follow the link below to continue creating your account. "
      + "<a href='"+process.env.ROOT_URL+"/signup/'"+ contact._id +">Sign up Here</a>\n\n"
      + "- Ivy"
    });
  },
  setUserUsername(username){
    Accounts.setUsername(Meteor.userId(), username);
  }

})
