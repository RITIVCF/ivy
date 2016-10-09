import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Option from './Option.jsx';
import SelectGroup from '../../sharedcomponents/SelectGroup.jsx';

export default class SiteSettingsForm extends TrackerReact(React.Component) {
	constructor(){
		super();

	}

	getOptions(){
		return Options.find({_id:{$ne:"ticketstatuses"}}).fetch();
	}

	getContactGroupDefault(){
		return Groups.findOne(Options.findOne("ticketcontact").gid).name;
	}

	getEventRequestGroupDefault(){
		return Groups.findOne(Options.findOne("ticketeventrequest").gid).name;
	}

	updateContactGroup(group){
		Meteor.call("setContactGroupDefault", group._id);
	}

	updateEventRequestGroup(group){
		Meteor.call("setEventRequestGroupDefault", group._id);
	}

	unset(){

	}

	render() {
		return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-sm-3 col-lg-2">
					<nav className="navbar navbar-default navbar-fixed-side">

					</nav>
				</div>
				<div className="col-sm-9 col-lg-10">
					<h1>Site Settings Dashboard</h1>
					<div className="row">
						<div className="col-md-6">
							<div className="panel panel-primary">
								<div className="panel-heading">
									<h2>Default Ticket Groups Configuration</h2>
								</div>
								<div className="panel-body">
									<label>Default Contact Type Group</label>
										<SelectGroup
										 parent={this}
										 id={"contacttype"}
										 className="form-control"
										 unset={this.unset.bind(this)}
										 updateContact={this.updateContactGroup.bind(this)}
										 initialValue={this.getContactGroupDefault()}
										 ref={"contacttype"}
										 /><br/>
									<label>Default Event Request Type Group</label>
										<SelectGroup
										 parent={this}
										 id={"eventrequesttype"}
										 className="form-control"
										 unset={this.unset.bind(this)}
										 updateContact={this.updateEventRequestGroup.bind(this)}
										 initialValue={this.getEventRequestGroupDefault()}
										 ref={"eventrequesttype"}
										 />
								</div>
							</div>
						</div>
					</div>
					<div className="panel panel-info">
						<div className="panel-heading">
							<h2>All Options</h2>
						</div>
						<div className="panel-body">
							{this.getOptions().map( (option) => {
								return <Option option={option} />
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
		)
	}
}
