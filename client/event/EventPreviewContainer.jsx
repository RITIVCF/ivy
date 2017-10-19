import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import moment from 'moment';
import { loadUser } from '/lib/classes/Contact.js';

export default class EventPreviewContainer extends TrackerReact(React.Component) {
	constructor(){
		super();

		this.state = {
			subscription: {
				event: Meteor.subscribe("thisEvent"),
				leader: Meteor.subscribe("")
			}
		};
	}

	getSelectedEvent(){
		let event = Events.findOne(Session.get("evselected"));
		if(!!event){
			return new Event(event);
		}
		return false;
	}

  render() {
    if(!Session.get("evselected")){
      return (
				<Row>
					<Column>
						<h2>Event Calendar</h2>
						<p>Select an event to continue...</p>
					</Column>
				</Row>
			);
    }
    if(!this.props.event||!this.props.ready){
      return <LoaderCircle />;
    }

    let leader = loadUser(this.props.event.owner);

		if(!this.props.event.name){
      return(
        <div>
          <p>Leader: {leader.getName()}<br/>{leader.getEmail()}</p>
          {this.getDateTime()}
        </div>
      );
    }

		let perms = checkEventPermission(this.props.event);
		let canEditEvent = perms.edit;
		let canViewEvent = perms.view;
		let isEventReviewed = this.props.event.isReviewed();
    let isFormOpen = (this.props.event.isPublished())&&(this.props.event.start < new moment(new Date).add(2,"hours"));
		let isUserOwner = leader._id==Meteor.userId();
		let isDebriefSubmitted = !!this.props.event.debrief;
		let hasPermissionToViewDebrief = (checkPermission("admin")||isUserOwner);
		let isEventPublished = this.props.event.isPublished();
		let isPastEventStart = this.props.event.start < new Date();
		let canEditDebrief = (
			!isDebriefSubmitted&&
			hasPermissionToViewDebrief&&
			isEventPublished&&
			isPastEventStart
		);
		let canViewDebrief = (
			isDebriefSubmitted&&
			hasPermissionToViewDebrief&&
			isEventPublished&&
			isPastEventStart
		);
		let canViewAttendance = (
			checkPermission('attendance')&&
			isEventPublished&&
			isFormOpen
		);

		const imgPath = this.props.event.pic ? this.props.event.pic : "/images/defaultEventSmall.png";

		return (
      <EventPreview
				event={event}
				leader={leader}
				imgPath={imgPath}
				canEditEvent={canEditEvent}
				canViewEvent={canViewEvent}
				isEventReviewed={isEventReviewed}
				canViewAttendance={canViewAttendance}
				isFormOpen={isFormOpen}
				canEditDebrief={canEditDebrief}
				canViewDebrief={canViewDebrief}
			/>
    );
  }
}
