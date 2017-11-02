import React, {Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { getUser } from '/lib/users.js';
import ContactPreview from './ContactPreview.jsx';

export default ContactPreviewContainer = createContainer(({ cid }) => {
  const contactSub = Meteor.subscribe('contactPreview', cid);
  const loading = !contactSub.ready();
	let contact;
	if( !loading ) {
		contact = getUser(cid);
	}
  const contactExists = !loading && !!contact;
  return {
    loading,
    contact,
    contactExists
  };
}, ContactPreview);
