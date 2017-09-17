import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import FeedbackForm from './feedback/FeedbackForm.jsx';
import MySchedule from './widgets/MySchedule.jsx';
import MyEvents from './widgets/MyEvents.jsx';
import MyTickets from './widgets/MyTickets.jsx';
import MyGroups from './widgets/MyGroups.jsx';
import SafariWarning from './SafariWarning.jsx';
import Dialog from 'material-ui/Dialog';

export default class DashboardWrapper extends TrackerReact(React.Component) {
	constructor(){
		super();
		this.state = {
			modalOpen: false,
			subscription: {
				user: Meteor.subscribe("userSelf")
			}
		}

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	openModal(){
		this.setState({modalOpen: true});
	}

	closeModal(){
		this.setState({modalOpen: false});
	}

	render() {
		setDocumentTitle("Dashboard");
		const actions = [
			<Button onClick={this.closeModal}>Close Modal</Button>
		];
		return (
				<div className="row">
					<div className="col s12 m6">
						<Card>
							<Button onClick={this.openModal}>Open Modal</Button>
							<Dialog
								title="Test Title"
								modal={false}
								actions={actions}
								open={this.state.modalOpen}
							>
								Some Content
							</Dialog>
						</Card>
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
