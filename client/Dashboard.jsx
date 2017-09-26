import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import FeedbackForm from './feedback/FeedbackForm.jsx';
import MySchedule from './widgets/MySchedule.jsx';
import MyEvents from './widgets/MyEvents.jsx';
import MyTickets from './widgets/MyTickets.jsx';
import MyGroups from './widgets/MyGroups.jsx';
import SafariWarning from './SafariWarning.jsx';

export default class DashboardWrapper extends TrackerReact(React.Component) {
	constructor(){
		super();
		this.state = {
			subscription: {
				user: Meteor.subscribe("userSelf")
			}
		}
	}

	render() {
		return (
				<div className="row">
					<div className="col s12 m6">
						<SafariWarning />
						<MySchedule />
						<MyTickets />
					</div>
		      <div className="col s12 m6">
							<MyEvents />
							<MyGroups />
							<FeedbackForm />
					</div>

				</div>



		)
	}
}
