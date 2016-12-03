import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SubHeader from '../layouts/SubHeader.jsx';
//import SelectContactForm from './SelectContactForm.jsx';

//Contacts = new Mongo.Collection('contacts');

export default class ContactWrapper extends TrackerReact(React.Component){
  render() {
    return (
      <div>

        <SelectContactForm />
      </div>
    )
  }
}
