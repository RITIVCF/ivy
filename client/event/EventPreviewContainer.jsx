import React from 'react';
import Event from '/lib/classes/Event.js'
import { withTracker } from 'meteor/react-meteor-data';
import PassesProps from '/imports/api/PassesProps';

export default withTracker(({ eid }) => {
  const eventSub = Meteor.subscribe('thisEvent', eid);
  const loading = !eventSub.ready();
  const event = getSelectedEvent(eid);
  const eventExists = !loading && !!event;
  return {
    loading,
    event,
    eventExists
  };
})(PassesProps);


function getSelectedEvent(eid){
	let event = Events.findOne(eid);
	if(event){
		return new Event(event);
	}
	return false;
}
