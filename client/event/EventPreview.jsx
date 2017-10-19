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

		if(!this.props.event){
			return <LoaderCircle />;
		}

		const {
			event,
			leader,
			imgPath,
			canEditEvent,
			canViewEvent,
			isEventReviewed,
			canViewAttendance,
			isFormOpen,
			canEditDebrief,
			canViewDebrief,
		 } = this.props;

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
	        <div>
						<Img src={imgPath} style={{width: '100%'}} />
	          <h5>{event.name}</h5>
	          <p>{event.description}</p>
	          <p>Start:{dateFormat(event.start)}</p>
						<p>End: {dateFormat(event.end)}</p>
						<p>Location: {event.location}</p>
						<p>Leader: {leader.getName()}<br/>{leader.getEmail()}</p>
	        </div>
	        <div>
	          {((canEditEvent||canViewEvent)&&!isEventReviewed)&&
	            <a href={"/events/workspace/" + event._id} style={{width: "100%", margin: "10px 0px"}}
							className="waves-effect waves-light btn">
	              {canEditEvent?"Edit Event":"View Event"}
	            </a>
	          }
	          {canViewAttendance&&
							<a href={"events/attendance/" + event._id} style={{width: "100%", margin: "10px 0px"}}
	            className="waves-effect waves-light btn">View Attendance</a>
						}
	          {isFormOpen&&
	            <a href={"/forms/signin/" + event._id} style={{width: "100%", margin: "10px 0px"}}
							className="waves-effect waves-light btn">Open Form</a>
	          }
	          {canEditDebrief&&
							<a href={"events/debrief/edit/" + event._id} style={{width: "100%", margin: "10px 0px"}}
							className="waves-effect waves-light btn">Edit Debrief</a>
	          }
						{canViewDebrief&&
							<a href={"events/debrief/view/" + event._id} style={{width: "100%", margin: "10px 0px"}}
							className="waves-effect waves-light btn">View Debrief</a>
						}
	        </div>
	      </Column>
			</Row>
    );
  }
}
