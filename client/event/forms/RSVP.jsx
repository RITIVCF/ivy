import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SelectContact from '../../sharedcomponents/SelectContact.jsx';

export default class RSVPWrapper extends TrackerReact(React.Component){
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

  submit(event){
    event.preventDefault();
    var eid = this.props.eid;
    var contact = this.state.contact;
    var name = this.refs.user.state.value;
    if( !contact ){
      var id = Meteor.call("newContact",
        this.refs.user.state.value,
        this.refs.email.value,
        this.refs.phone.value,
        function(error, cid){
          Meteor.call("createRSVPRecord",
            eid,
            cid,
            event.target.elements.rsvp.value);
        });
    }
    else{
      Meteor.call("createRSVPRecord",
        this.props.eid,
        contact._id,
        event.target.elements.rsvp.value);
    }
    this.refs.email.value="";
    this.refs.phone.value="";
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
    console.log(this);
  }

  unset(){
    this.state.contact = false;
    this.refs.email.value="";
    this.refs.phone.value="";
  }

  render() {
    let event = this.getEvent();
    if(!event){
      return(<div></div>)
    }
    document.title = "Ivy - " + event.name + " RSVP";
    //var users =[];
    //let tempusers = this.getUsers();
    let contacts = this.getContacts();
    //if(!tempcontacts){
    if(!contacts){
      return(<div></div>)
    }

    return (
      <div id="card" className="card">
        <div className="front">
          <h1>RSVP to {event.name}!</h1>
          <h2>Thanks for letting us know!</h2>
          <form className="publicForm" onSubmit={this.submit.bind(this)}>
            <label>Name</label>
            <SelectContact parent={this}
              unset={this.unset.bind(this)}
              updateContact={this.update.bind(this)} ref="user"  />
            <br />
            <label>Email</label>
            <input ref="email" type="text" />
            <br />
            <label>Phone</label>
            <input ref="phone" type="text" />
            <br />
            <h3>RSVP:</h3>
            <label>Yes</label>
            <input ref="rsvp" type="radio" name="rsvp" value="yes"></input>
            <label>No</label>
            <input ref="rsvp"type="radio" name="rsvp" value="no"></input>
            <label>Maybe</label>
            <input ref="rsvp" type="radio" name="rsvp" value="maybe"></input>
            <input type="submit" />
          </form>
        </div>
      </div>
    )
  }
}
