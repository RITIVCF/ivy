import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SelectContact from '../../sharedcomponents/SelectContact.jsx';

export default class SignInWrapper extends TrackerReact(React.Component){
  constructor(props) {
    super(props);

    this.state = {
      subscription: {
        Event: Meteor.subscribe("Event", props.eid),
        Contacts: Meteor.subscribe("allContacts")
      },
      contact: false
    };
  }

  componentWillUnmount(){
    this.state.subscription.Event.stop();
    this.state.subscription.Contacts.stop();
  }

  submit(event){
    event.preventDefault();
    var eid = this.props.eid;
    var contact = this.state.contact;
    var evname = this.refs.evname.value;
    var name = this.refs.user.state.value;
    var newsletter = this.refs.newsletter.checked;
    if( !contact ){
      var id = Meteor.call("newContact",
        this.refs.user.state.value,
        this.refs.email.value,
        this.refs.phone.value,
        function(error, cid){
          Meteor.call("addAttendanceTicket",
            "New Contact: "+ name,
            "New Contact at event: "+ evname,
            "","", cid,
            eid,
            function(errr, tktId){
              if(errr){
                console.log(errr.reason);
                return;
              }
              Meteor.call("createAttendanceRecord",
              eid, cid,
              true,
              tktId);
            });
            if(newsletter){
              Meteor.call("updateNewsletter", cid, true);
            }
        });

    }
    else{
      Meteor.call("createAttendanceRecord",
      this.props.eid,this.state.contact._id,
      false,
      "");
      if(this.refs.newsletter){
        Meteor.call("updateNewsletter", this.state.contact._id, true);
      }
    }
    this.refs.email.value="";
    this.refs.phone.value="";
    this.refs.newsletter.checked=false;
    this.refs.user.state.value='';
    this.refs.user.forceUpdate();
  }

  getEvent(){
    return Events.findOne(this.props.eid);
  }

  getContacts(){
    return Contacts.find().fetch();
  }

  update(contt){
    this.state.contact = contt;
    this.refs.email.value = this.state.contact.email;
    this.refs.phone.value = this.state.contact.phone;
    this.refs.newsletter.checked = this.state.contact.newsletter;
    //this.setState({contact:contt});
    //console.log(this);
  }

  log(){
    console.log(this.state);
  }

  unset(){
    console.log(this);
    this.state.contact = false;
    this.refs.email.value="";
    this.refs.phone.value="";
    this.refs.newsletter.checked=false;
    //this.clearFields.bind(this);
  }

  render() {
    let event = this.getEvent();
    if(!event){
      return(<div></div>)
    }
    document.title = "Ivy - " + event.name + " Sign In";
    //var contacts =[];
    //let tempcontacts = this.getContacts();
    let contacts = this.getContacts();
    //if(!tempcontacts){
    if(!contacts){
      return(<div></div>)
    }
    //tempcontacts.forEach(function(contact){
      //contacts.push({"name":contact.name+" "+contact.email,"value":contact._id});  for Select Search
    //});

    //console.log(contacts);


    return (
      <div id="card" className="card">
        <div className="front">
          <h1>Welcome to {event.name}!</h1>
          <input type="hidden" ref="evname" value={event.name} />
          <h2>Help text here...</h2>
          <form className="publicForm" onSubmit={this.submit.bind(this)}>
            <label>Name</label>
            <SelectContact
              parent={this}
              unset={this.unset.bind(this)}
              initialValue={""}
              updateContact={this.update.bind(this)}
              ref="user"  />
            <br />
            <label>Email</label>
            <input ref="email" type="text" />
            <br />
            <label>Phone</label>
            <input ref="phone" type="text" />
            <br />
            <label>Subscribe to newsletter</label>
            <input type="checkbox" ref="newsletter" />
            <br/>
            <input type="submit" name="submit" />
          </form>
        </div>
      </div>
    )
  }
}
