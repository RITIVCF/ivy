import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class SignInWrapper extends TrackerReact(React.Component){
  getEvent(){
    return Events.findOne(this.props.eid);
  }

  render() {
    event = this.getEvent();

    return (
      <div id="card" className="card">
        <div className="front">
          <h1>Welcome to {event.name}!</h1>
          <h2>Help text here...</h2>
          <form className="publicForm">
            <label>Name</label>
            <input ref="name" type="text" />
            <label>Email</label>
            <input ref="email" type="text" />
          </form>
        </div>
      </div>
    )
  }
}
