import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Option from './Option.jsx';
import SelectGroup from '../../sharedcomponents/SelectGroup.jsx';

export default class SiteSettingsForm extends TrackerReact(React.Component) {
	constructor(){
		super();

	}

	componentDidMount(){
		$('select').material_select();
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

	changeCalendarView(event){
		event.preventDefault();
		console.log(event.target.value);
		console.log(this.refs.defaultView.value);
		Meteor.call("setDefaultCalendarView", this.refs.defaultView.value);
	}

	unset(){

	}

	render() {
		return (
		<div className="container">
			<div className="row">

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
										 /><br/>
									 <label>Default Event Calendar View</label>
	 									<select
											value={Options.findOne("calendarview").val}
											onChange={this.changeCalendarView.bind(this)}
											className="form-control"
											ref="defaultView"
											>
											<option value={"agendaWeek"}>Week Agenda</option>
											<option value={"month"}>Month</option>
											<option value={"agendaDay"}>Day Agenda</option>
										</select>
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
								return <Option key={option._id} option={option} />
							})}
						</div>
					</div>
				</div>
			</div>
		)
	}
}
