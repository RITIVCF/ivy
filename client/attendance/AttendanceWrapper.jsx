import React from 'react';
import EventDetail from './EventDetail.jsx';
import LoaderCircle from '../LoaderCircle.jsx';
import NoPerm from '../NoPerm.jsx';

export default function AttendanceWrapper({ loading, event, eventExists }) {
  if ( loading ) {
    return <LoaderCircle />
  }
  if ( !checkPermission("attendance") ) {
		return <NoPerm />
	}
	return (
		<EventDetail event={event} />
	)
}
