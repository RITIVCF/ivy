import React, {Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Event from '/lib/classes/Event.js'
import AttendanceWrapper from './AttendanceWrapper';

export default AttendanceContainer = createContainer(({ eid }) => {
  const eventSub = Meteor.subscribe('eventAttendance', eid);
  const loading = !eventSub.ready();
  const event = getSelectedEvent(eid);
  const eventExists = !loading && !!event;
  return {
    loading,
    event,
    eventExists
  };
}, AttendanceWrapper);

function getSelectedEvent(eid){
	let event = Events.findOne(eid);
	if(!!event){
		return new Event(event);
	}
	return;
}
