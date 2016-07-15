import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SelectSearch from 'react-select-search';

export default class SignInWrapper extends TrackerReact(React.Component){
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
    console.log("First Time:" + this.refs.first.value);
    Meteor.call("createAttendanceRecord",this.props.eid,this.refs.user.value,this.refs.first.value);
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
    //tempusers.forEach(function(user){
      //users.push({"name":user.name+" "+user.email,"value":user._id});  for Select Search
    //});

    console.log(users);


    return (
      <div id="card" className="card">
        <div className="front">
          <h1>Welcome to {event.name}!</h1>
          <h2>Help text here...</h2>
          <form className="publicForm" onSubmit={this.submit.bind(this)}>
            <label>Name</label>
            {/*}<input ref="name" type="text" />*/}
            <select className="select" ref="user" onChange={this.update.bind(this)}>
              {users.map( (user)=>{
                  return <option value={user._id}>{user.name+" "+user.email}</option>
              })}
            </select>
            {/*<SelectSearch options={users} name="name" placeholder="Choose your name" />*/}
            <label>Email</label>
            <input ref="email" type="text" />
            <label>First Time (true or false)</label>
            <input type="text" ref="first" />
            <input type="submit" name="submit" />
          </form>
        </div>
      </div>
    )
  }
}
