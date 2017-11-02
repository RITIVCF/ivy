import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import LoaderCircle from '/client/LoaderCircle';
import EventCalendarPage from './EventCalendarPage';


export default class EventCalendarWrapper extends TrackerReact(React.Component) {
	render() {
    if(SiteOptions.ready()){
			return <EventCalendarPage />
		}

		return <LoaderCircle />
	}

}
