import React, {Component} from 'react';

export default class ContactDetails extends Component {
  getContact(){
    return Meteor.users.findOne(this.props.cid);
  }
  render() {
    var contact = this.getContact();
    return (
      <div className="card">
        <div className="card-content">
          <span className="card-title">
            {contact.name}
          </span>
          <p><input type="checkbox" ref="name" /><label>Name:</label> {contact.name}</p>
          <p><input type="checkbox" ref="email" /><label>Email:</label> {contact.emails[0].address}</p>
          <p><input type="checkbox" ref="phone" /><label>Phone:</label> {contact.phone}</p>
          <p><input type="checkbox" ref="major" /><label>Major:</label> {contact.major}</p>
          <p><input type="checkbox" ref="bio" /><label>Bio:</label> {contact.bio}</p>
          <p><input type="checkbox" ref="news" /><label>Newsletter:</label> {contact.newsletter?"Yes":"No"}</p>
        </div>
      </div>
    )
  }
}
