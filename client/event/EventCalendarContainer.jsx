import React, {Component} from 'react';
import EventCalendar from './EventCalendar';
import { createContainer } from 'meteor/react-meteor-data';

export default EventCalendarContainer = createContainer(({ start, end, currentTags, onNewDateRange, setTitle }) => {
	const myEventsSub = Meteor.subscribe("myEvents", start, end, function(){console.log("myEvents Ready")});
	const unpublishedEventsSub = Meteor.subscribe("otherUnpublishedEvents", start, end, function(){console.log("UnpublishedEvents Ready")});
  const loading = ( !myEventsSub.ready() && !unpublishedEventsSub.ready() );
  const myEvents = getPublishedEvents({ currentTags: currentTags });
	const unpublishedEvents = getUnPublishedEvents({ currentTags: currentTags });

  return {
    loading,
    myEvents,
		unpublishedEvents,
		onNewDateRange,
		setTitle
  };
}, EventCalendar);

function getPublishedEvents({ currentTags }){
	let tags = Options.findOne("eventtags").vals;
	var events = Events.find({$or:[{tags: {$in: currentTags}},{tags: []}], $or: [{status: "Published"},{status: "Reviewed"}]}).fetch();
	events.forEach((event)=>{
		event.title=event.name;
		var newcolors = [];
		event.tags.forEach((tagname)=>{
			var color = tags.filter(tag => tag.tag == tagname)[0].color;
			newcolors.push(color);
		});
		event.tags=newcolors;
	});

	var grps = Groups.find({users: Meteor.userId()}).fetch();
	var ids = [];
	grps.forEach(function(group){
		ids.push(group._id);
	});

	return events;
}

function getUnPublishedEvents({ currentTags }){
	if(checkPermission('events')){
		var events = Events.find({$or:[{tags: {$in: currentTags}},{tags: []},{tags: undefined}], status: "Unpublished"}).fetch();

		return addTagToUnPublishedEvents(events);
	}
	else{

		var events = Events.find({
			$or:[{tags: {$in: currentTags}},{tags: []},{tags: undefined}],
			status: "Unpublished",
		}).fetch();
		return addTagToUnPublishedEvents(events);
	}
}

function addTagToUnPublishedEvents(events){
	let tags = Options.findOne("eventtags").vals;
	events.forEach((event)=>{
		event.editable=(!event.name)?false:true;
		event.title=event.name?event.name:"";
		if(event.tags) {
			var newcolors = [];
			event.tags.forEach((tagname)=>{
				var color = tags.filter(tag => tag.tag == tagname)[0].color;
				newcolors.push(color);
			});
			event.tags=newcolors;
		} else {
			event.tags = [];
		}
	});
	return events;
}
