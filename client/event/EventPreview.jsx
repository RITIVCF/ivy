import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import LoaderCircle from '/client/LoaderCircle';
import moment from 'moment';
import { loadUser } from '/lib/classes/Contact.js';

export default class EventPreview extends TrackerReact(React.Component) {
	constructor(props){
		super(props);

	}

  render() {

		if(this.props.loading){
			return <LoaderCircle />;
		}

		const { event } = this.props;

    let leader = loadUser(event.getOwner());

		if(!event.name){
      return(
        <div>
          <p>Leader: {leader.getName()}<br/>{leader.getEmail()}</p>
          {this.getDateTime()}
        </div>
      );
    }

		let perms = checkEventPermission(event);
		let canEditEvent = perms.edit;
		let canViewEvent = perms.view;
		let isEventReviewed = event.isReviewed();
    let isFormOpen = (event.isPublished())&&(event.start < new moment(new Date).add(2,"hours"));
		let isUserOwner = leader._id==Meteor.userId();
		let isDebriefSubmitted = !!event.debrief;
		let hasPermissionToViewDebrief = (checkPermission("admin")||isUserOwner);
		let isEventPublished = event.isPublished();
		let isPastEventStart = event.start < new Date();
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

		const imgPath = event.pic ? event.pic : "/images/defaultEventSmall.png";

		if(!event.name){
      return(
        <div>
          <p>Leader: {leader.getName()}<br/>{leader.getEmail()}</p>
        </div>
      );
    }

		return (
      <Row>
				<Column>
					<div style={styles.actionBar}>
						{((canEditEvent||canViewEvent)&&!isEventReviewed)&&
							<div style={styles.label}>
								<label>{canEditEvent?"Edit":"View"}</label>
							</div>
						}
						{canViewAttendance&&
							<div style={styles.label}>
								<label>Attendance</label>
							</div>
						}
						{canEditDebrief&&
							<div style={styles.label}>
								<label>Debrief</label>
							</div>
						}
						{canViewDebrief&&
							<div style={styles.label}>
								<label>Rating</label>
							</div>
						}
						{isFormOpen&&
							<div style={styles.label}>
								<label>Form</label>
							</div>
						}
					</div>
					<Row style={styles.actionBar}>
						{((canEditEvent||canViewEvent)&&!isEventReviewed)&&
							<a href={"/events/workspace/" + event._id} style={styles.action}
							className="waves-effect waves-light btn">
								<i className="material-icons">{canEditEvent?"build":"visibility"}</i>
							</a>
						}
						{canViewAttendance&&
							<a href={"events/attendance/" + event._id} style={styles.action}
							className="waves-effect waves-light btn"><i className="material-icons">supervisor_account</i></a>
						}
						{canEditDebrief&&
							<a href={"events/debrief/edit/" + event._id} style={styles.action}
							className="waves-effect waves-light btn"><i className="material-icons">assignment</i></a>
						}
						{canViewDebrief&&
							<a href={"events/debrief/view/" + event._id} style={styles.action}
							className="waves-effect waves-light btn"><i className="material-icons">assessment</i></a>
						}
						{isFormOpen&&
							<a href={"/forms/signin/" + event._id} style={styles.action}
							className="waves-effect waves-light btn"><i className="material-icons">launch</i></a>
						}
					</Row>
	        <div>
						<Img src={imgPath} style={{width: '100%'}} />
	          <h5>{event.name}</h5>
	          <p>Start:{dateFormat(event.start)}</p>
						<p>End: {dateFormat(event.end)}</p>
						<p>Location: {event.location}</p>
						<p>Leader: {leader.getName()}<br/>{leader.getEmail()}</p>
						<p>Description: <br/>{event.description}</p>
	        </div>
	      </Column>
			</Row>
    );
  }
}


const styles = {
	actionBar: {
		display: "flex"
	},
	action: {
		flex: "1",
		padding: "0px 10px",
		margin: "0px 5px"
	},
	label: {
		flex: "1",
		textAlign: "center"
	}
}
