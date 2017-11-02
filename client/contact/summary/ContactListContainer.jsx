import React, {Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { getUsers } from '/lib/users.js';
import ContactList from './ContactList';

export default ContactListContainer = createContainer(({ statuses, filter }) => {
  const sub = Meteor.subscribe('contactSummary', statuses, filter);
  const loading = !sub.ready();
  const contacts = loadContacts({ statuses: statuses, filter: filter	});
  return {
    loading,
    contacts
  };
}, ContactList);

function loadContacts({ statuses=[], filter="" }){
	let query= {};
	query.funnelStatus = {$in: statuses};
	query.status = {$in: ["Present", "Absent"]};
	let options = {sort: {name: 1}} //, limit: this.state.num};
	if(filter!=""){
		query.name={ $regex : filter, $options : 'i'};
	}

	return getUsers(query, options);
}
