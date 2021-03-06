import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import DuplicateContactForm from './DuplicateContactForm.jsx';
import LoaderCircle from '../../LoaderCircle.jsx';

export default class DuplicateContactWrapper extends TrackerReact(React.Component) {
	constructor(){
		super();

		this.state={
			subscription: {
					Contacts: Meteor.subscribe("allContacts"),
			}
		};

	}

	componentWillUnmount(){
		this.state.subscription.Contacts.stop();
	}

	render() {

		if(!this.state.subscription.Contacts.ready()){
			return <LoaderCircle />
		}
		if(!checkPermission("admin")){
			return <div>Sorry you don't have permission to view this page. Please see the leadership team to get access.</div>
		}
		return (
			<div className="container">
				<div className="row">
					<div className="center-align" style={{paddingTop:"50px"}}>
						<div className="card-panel">
							<div className="card-content">
								<p>This area is currently under construction until further notice.</p>
							</div>
						</div>
					</div>
					
					{/* <DuplicateContactForm  /> */}
				</div>
			</div>
		)
	}
}
