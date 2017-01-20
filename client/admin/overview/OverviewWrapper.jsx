import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import OverviewPage from './OverviewPage.jsx';
import NoPerm	from '../../NoPerm.jsx';
import LoaderCircle from '../../LoaderCircle.jsx';

export default class OverviewWrapper extends TrackerReact(React.Component) {
	constructor(){
		super();
		this.state = {
			subscription: {
				Users: Meteor.subscribe("allUsers"),
				Contacts: Meteor.subscribe("allContacts"),
				Funnel: Meteor.subscribe("funnelHistory")
			}
		};
		document.title="Ivy - Chapter Overview";

	}

	componentWillUnmount() {
		this.state.subscription.Users.stop();
		this.state.subscription.Contacts.stop();
		this.state.subscription.Funnel.stop();
	}

	render() {
		if(!checkPermission("admin")){
			return <NoPerm />
		}
		if(!this.state.subscription.Funnel.ready()){
			return <LoaderCircle />
		}
		return (
			<OverviewPage />
		)
		/*}<div className="row">
			<div className="col s12">
				<div className="card">
					<div className="card-content">*/

					/*}</div>
				</div>
			</div>
		</div>*/
	}
}
