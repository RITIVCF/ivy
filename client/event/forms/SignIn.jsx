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
      contact: false,
      new: false
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
        this.refs.major.value,
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
    this.refs.major.value="";
    this.state.new=false;
    this.refs.user.state.value='';
    this.refs.user.forceUpdate();
    this.refs.user.focus();
  }

  getEvent(){
    return Events.findOne(this.props.eid);
  }

  getContacts(){
    return Contacts.find().fetch();
  }

  update(contt){
    this.state.contact = contt;
    this.state.new = false;
    this.refs.email.value = this.state.contact.email;
    //this.refs.phone.value = this.state.contact.phone;
    //this.refs.newsletter.checked = this.state.contact.newsletter;
    //this.setState({contact:contt});
    //console.log(this);
  }

  log(){
    console.log(this.state);
  }

  setNew(){
    if(!this.state.contact){
      this.state.new = true;
    }
  }

  unset(){
    console.log(this);
    this.state.contact = false;
    this.refs.email.value="";
    this.refs.phone.value="";
    this.refs.newsletter.checked=false;
    this.refs.major.value="";
    this.state.new=false;
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
      <div className="container-fluid">
        <div className="panel panel-default">
          <h1>Welcome to {event.name}!</h1>
          <input type="hidden" ref="evname" value={event.name} />
          <h2>Please sign in</h2>
          <p>Click on your name in the dropdown or continue to create a new contact.</p>
          <form className="publicForm" onSubmit={this.submit.bind(this)}>
            <div className="form-group">
              <SelectContact
                parent={this}
                unset={this.unset.bind(this)}
                onBlur={this.setNew.bind(this)}
                initialValue={""}
                updateContact={this.update.bind(this)}
                id="first_name"
                type="text"
                ref="user"
                className="validate" />
              <input ref="email" placeholder="Email" id="email" type="email" required />
              <input ref="phone" placeholder="Phone number (optional)" type="tel" className={this.state.new?"hidden":""} />
              <input ref="major" placeholder="Major" type="text" className={this.state.new?"hidden":""} />
              <input type="checkbox" ref="newsletter" id="news" name="news" className={this.state.new?"hidden":""} value="Yes" />
              <label htmlFor="news">Please sign me up for the newsletter</label>
              <input type="submit" name="submit" value="Sign In" className="form-control" />
            </div>
          </form>
        </div>
      </div>
    )
  }
}
