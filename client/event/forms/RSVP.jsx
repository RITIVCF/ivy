import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class RSVPWrapper extends TrackerReact(React.Component){
  constructor(props) {
    super(props);

    this.state = {
      subscription: {
        Event: Meteor.subscribe("Event", props.eid),
        Users: Meteor.subscribe("allUsers")
      }
    };
  }

  submit(event){
    event.preventDefault();
    console.log("Event ID: "+this.props.eid);
    console.log("user ID: "+ this.refs.user.value);
    console.log("User Email: "+ this.refs.email.value);
    console.log(event.target.elements.rsvp.value);
    Meteor.call("createRSVPRecord",this.props.eid,this.refs.user.value,event.target.elements.rsvp.value);
  }

  getEvent(){
    return Events.findOne(this.props.eid);
  }

  getUsers(){
    return Meteor.users.find().fetch();
  }

  update(){
    console.log(this);
    var user = Meteor.users.findOne(this.refs.user.value);
    this.refs.email.value = user.email;
  }

  render() {
    let event = this.getEvent();
    if(!event){
      return(<div></div>)
    }
    //var users =[];
    //let tempusers = this.getUsers();
    let users = this.getUsers();
    //if(!tempusers){
    if(!users){
      return(<div></div>)
    }

    return (
      <div id="card" className="card">
        <div className="front">
          <h1>RSVP to {event.name}!</h1>
          <h2>Thanks for letting us know!</h2>
          <form className="publicForm" onSubmit={this.submit.bind(this)}>
            <label>Name</label>
            {/*}<input ref="name" type="text" />*/}
              <select className="select" ref="user" onChange={this.update.bind(this)}>
                {users.map( (user)=>{
                    return <option value={user._id}>{user.name+" "+user.email}</option>
                })}
              </select>
            <label>Email</label>
            <input ref="email" type="text" />
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
