import Event from '/lib/classes/Event.js';
import { getDefaultEventGroups } from '/lib/groups.js';

// Leaveing this nomenclature since it is used in many places
checkEventPermission = function(ev){
	if(Groups.find({_id:"admin", users: Meteor.userId()}).fetch().length==1){
		return {view: true, edit: true};
	}
  // if(!ev.permUser){
  //   return {"view":false,"edit": false};
  // }
	if(ev.owner==Meteor.userId()){
		return {view: true, edit: true}
	}
  var perm = false;// ev.perm[""]
	var view = false;
	for(i=0; i < ev.permUser.length; i++){
		if(ev.permUser[i].id == Meteor.userId()){
			view = true;
			perm = ev.permUser[i].edit;
			break;
		}
	}
	for(i=0; i < ev.permGroup.length; i++){
		if(getUserGroupPermission().indexOf(ev.permGroup[i].id)>-1){
			view = true;
			perm = ev.permGroup[i].edit||perm;
			break;
		}
	}
  return {"view": view,"edit": perm};
}

export {
	createNewEvent,
	deleteAllRecurEvents,
	setPublishAllRecurEvents,
	deleteEvent,
	getEventPermission,
	canUserEditEvent,
	canUserViewEvent,
	setEventGroup,
	createRecurringEvents,
	anyUnpublishedRecurring,
	updateEventStart,
	updateEventEnd,
	setEventTag
}

// Better nomenclature for new places but uses
// checkEventPermission since it is already defined
function getEventPermission(ev){
	return checkEventPermission(ev);
}

function canUserEditEvent(ev){
	return getEventPermission(ev).edit;
}

function canUserViewEvent(ev){
	return getEventPermission(ev).view;
}

function setEventGroup(eid, groupId){
	Events.update(eid, {$set: {groupId: groupId}});
}

function updateEventStart(eid, newStart) {
	const difference = getEventDuration({eid: eid});
	const newEnd = addTime(newStart, difference, "milliseconds");

	let data = {
		start: newStart,
		end: newEnd
	}

	Events.update(eid,
		{$set: data	}
	);
}

function updateEventEnd(eid, newEnd) {
	const event = Events.findOne(eid);
	let data = {
		end: newEnd
	}
	if( newEnd < event.start ){
		const difference = getEventDuration({event: event});
		const newStart = subtractTime(newEnd, difference, "milliseconds");
		data.start = newStart;
	}

	Events.update(eid, {$set: data});
}

function getEventDuration({
	eid = "", event = ""
}){
	if( !event ){
		if( !!eid ){
			event = Events.findOne(eid);
		} else {
			// No event or eid passed
			throw 'Invalid arguments';
		}
	}

	return event.end - event.start;
}

function deleteEvent(eid){
	let event = new Event(Events.findOne(eid));

	if(!event.isReviewed()){
		Events.update({_id:eid},{$set: {deleted: true}});
		Tickets.update({eid:eid},{$set: {deleted: true}});
	}

}

function anyUnpublishedRecurring(recurId) {
	let events = Events.find({recurId: recurId, status: "Unpublished"}).fetch();
	return (events.length >= 1);
}

function deleteAllRecurEvents(recurId){
	let events = Events.find({recurId: recurId, status: {$ne: "Reviewed"}}).fetch();

	// do the delete
	events.forEach( (event) => {
		deleteEvent(event._id);
	});
}

function setPublishAllRecurEvents(recurId, publish){
	let events = Events.find({recurId: recurId, status: {$ne: "Reviewed"}}).fetch();

	let status = "Unpublished";
	// do publish or unpublish
	events.forEach( (event) => {
		if(publish){
			status = "Published";
		}
		else{
			status = "Unpublished";
		}
		Events.update(event._id, {$set: {status: status}});
	});
}


function createRecurringEvents(eid, endDate){
	let event = Events.findOne(eid);
	let duplicatedEvent = duplicateEvent(event);

	// set recurId eq to the
	duplicatedEvent.recurId = event._id;
	setEventRecurId(event._id, event._id);

	let start = addDays(event.start, 7);
	let end = addDays(event.end, 7);
	try {
		do {
			// set new date
			duplicatedEvent.start = start;
			duplicatedEvent.end = end;

			// insert into Events
			Events.insert(duplicatedEvent);

			start = addDays(start, 7);
			end = addDays(end, 7);
		} while (start < endDate);
		} catch (e) {
		return false;
	}


	// Signal true that it worked.
	return true;
}


function duplicateEvent(event){
	let newEvent = getDefaultEvent(event.name, event.date);

	getFieldsToDuplicate().forEach( (field) => {
		newEvent[field] = event[field];
	});

	return newEvent;
}

function createNewEvent(name, date){
	let newEvent = getDefaultEvent( name, date );
	let newId = Events.insert(newEvent);
	return newId;
}


function getDefaultEvent(name, date) {
	// Validate arguments
	if(!name){
		name = "Default Event";
	}
	if(!date){
		date = addDays(new Date(), 2);
	}

	let defaultEvent = {
		name: name,     // Name  *publicly visab
		namelock: false,
		createdAt: new Date(),   //Date created
		//published: false,    // published to the public calendar
		status: "Unpublished",
		permUser: [],      // {UserID: true/false}   true=edit, false=view
		permGroup: getDefaultEventGroups(),     // [{id: groupID, edit: true/false}]
		start: date,    // date time object
		end: new moment(date.toISOString()).add(1, "hours")._d,       // Date time object
		workpad:[
			{
				name: "Pad 1",
				content: "",
				lock: false
			}],      // text area for working
		workpadlock: false,
		description: "", // public description
		descriptionlock: false,
		notes: "",   // the notes field for all the workspace
		location: "",  // text area for location
		locationlock: false,
		host: "", // user ID of the host
		owner: Meteor.userId(), // user ID of the creator and owner. Can be changed.
		createdBy: Meteor.userId(),
		tags: [],     // tags to sort events by, not type as there can be more than one type potentially
		recurId: "",  // id set if part of recuring set
		groupId: "", // id of associated group
		notes: [],    // This is an array of note objects  {note: "text", createdAt: "DateTime", createdBy: "user ID"}
		attachements: [],  // This is an array of text objects pointing to different attachements
		attendees: [],     // This is an array of user Ids of people who attended
		rsvps: [],         // This is an array of {userId: , rsvp: [yes, no, interested]} of people who RSVPed to this event (Mostly for conference sign ups and such)
		pic: "",   // pointer to image location, less we deem sending pictures to the database better
		reserved: false, //room reserved
		evr: false,  // registered with university
		jobs: []     // {id: userid, jobname: "Job Name"}
	};

	return defaultEvent;
}


function setEventGroupId(eid, groupId){
	Events.update(eid, {$set: {groupId: groupId}});
}

function setEventRecurId(eid, recurId){
	Events.update(eid, {$set: {recurId: recurId}});
}


function setEventTag(eid, tagID){
	if(isEventTagValid(tagID)){
		Events.update(eid, {$set: {"tags": [tagID]}});
	} else {
		Events.update(eid, {$set: {"tags": []}});
	}
}

function isEventTagValid(tagID){
	const tags = Options.findOne("eventtags").vals;
	let isValid = tags.filter((tag)=>{
		return tag.tag == tagID;
	});
	return isValid.length == 1;
}

function getFieldsToDuplicate(){
	return Options.findOne("duplicateeventfields").vals;
}
