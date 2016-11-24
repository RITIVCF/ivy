import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class EventHelp extends TrackerReact(React.Component) {


  render() {
    return (
      <div id="helpmodal" className="modal">
        <div className="modal-content">
          <h3>Event Dashboard</h3>
          <p>This is the full management area for planning events. Blue events are published events. Red events have not been published.
            If the event is unpublished without a name, that means you do not have the permission to view or edit that event. You can
            continue to edit events after they have been published if you have permission.
          </p><br/>
        <img src="/images/CalendarExample.jpg" width="100%" className="materialboxed" ></img>
        <h5>Potential Actions:</h5>
          <p>
            <b>Event Click:</b> View event details and attendance, edit event, and open form.<br/>
            <b>Drag & Resize:</b> change the date and time by dragging and event or dragging the handle in week view.<br/>
            <b>Calendar Click:</b> Click on a day (or, in Week View, day and time) to create a new event at that time. "Edit Event" goes directly to the event
            workspace. "Create" only creates the event with the default time.</p>
        </div>
        <div className="modal-footer">
          <a className="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
        </div>
      </div>
    )
  }
}
