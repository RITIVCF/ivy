import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Option from './Option.jsx';
import SelectGroup from '../../sharedcomponents/SelectGroup.jsx';
import EventTagForm from './EventTagForm.jsx';

export default class SiteSettingsForm extends TrackerReact(React.Component) {
	constructor(){
		super();

	}

	componentDidMount(){
		$('select').material_select();
	}

	getOptions(){
		return Options.find({_id:{$nin:["ticketstatuses","ticketcontact","ticketeventrequest"]}}).fetch();
	}

	merge(){
		Meteor.call("migrateDatabase", function(error){
			if(error){
				console.log("Error:");
				console.log(error);
			}
			else{
				console.log("success");
			}
		});
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
			<div >
				<div className="row" >
					<div className="col s6" >
						<div className="divider"></div>
						<div className="card">
							<div className="card-content">
								<span className="card-title">Default Ticket Groups Configuration</span>
									<br/>
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
					<div className="col s6" >
						<div className="divider"></div>
						<EventTagForm />
					</div>
					<div className="row">
						<div className="col s12">
							<h2>All Options</h2>
								{this.getOptions().map( (option) => {
									return <Option key={option._id} option={option} />
								})}
						</div>
					</div>
				</div>
				{checkPermission("removecontact")?
				<div className="row">
					<div className="col s6">
						<p>Perform User & Contact Merge</p>
						<a className="btn flat" onClick={this.merge.bind(this)}>Merge</a>
					</div>
				</div>:""}
			</div>
		)
	}
}
