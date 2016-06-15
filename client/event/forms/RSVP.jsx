import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class RSVPWrapper extends TrackerReact(React.Component){
  getEvent(){
    return Events.findOne(this.props.eid);
  }

  render() {
    event = this.getEvent();

    return (
      <div id="card" className="card">
        <div className="front">
          <h1>RSVP to {event.name}!</h1>
          <h2>Thanks for letting us know!</h2>
          <form className="publicForm">
            <label>Name</label>
            <input ref="name" type="text" />
            <label>Email</label>
            <input ref="email" type="text" />
            <h3>RSVP:</h3>
            <label>Yes</label>
            <input ref="yes" type="radio" ></input>
            <label>No</label>
            <input ref="no" type="radio" ></input>
            <label>Maybe</label>
            <input ref="maybe" type="radio" ></input>
          </form>
        </div>
      </div>
    )
  }
}
