import React, {Component} from 'react';
import EventPreview from './EventPreview';
import Event from '/lib/classes/Event.js'
import { createContainer } from 'meteor/react-meteor-data';

export default EventPreviewContainer = createContainer(({ eid }) => {
  const eventSub = Meteor.subscribe('thisEvent', eid);
  const loading = !eventSub.ready();
  const event = getSelectedEvent(eid);
  const eventExists = !loading && !!event;
  return {
    loading,
    event,
    eventExists
  };
}, EventPreview);

function getSelectedEvent(eid){
	let event = Events.findOne(eid);
	if(!!event){
		return new Event(event);
	}
	return false;
}
