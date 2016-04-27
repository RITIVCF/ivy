import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

import MemberForm from './MemberForm.jsx';

Contacts = new Mongo.Collection('contacts');

export default class MemberWrapper extends TrackerReact(React.Component){
  render() {
    return (
      <div>
        <MemberForm />
      </div>
    )
  }
}
