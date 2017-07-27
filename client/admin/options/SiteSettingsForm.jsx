import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Option from './Option.jsx';
import SelectTeam from '../../sharedcomponents/SelectTeam.jsx';
import EventTagForm from './EventTagForm.jsx';

export default class SiteSettingsForm extends TrackerReact(React.Component) {
	constructor(){
		super();

	}

	componentDidMount(){
		Materialize.updateTextFields();
		$('select').material_select();
	}

	getOptions(){
		return Options.find({_id:{$nin:["ticketstatuses","ticketcontact","ticketeventrequest"]}}).fetch();
	}

	merge(){
		/*Meteor.call("migrateDatabase", function(error){
			if(error){
				console.log("Error:");
				console.log(error);
			}
			else{
				console.log("success");
			}
		});*/
	}

	getContactGroupDefault(){
		return Groups.findOne(Options.findOne("ticketcontact").gid).name;
	}


	getTypeGroup(gid){
		return Groups.findOne(gid).name;
	}

	updateContactGroup(group){
		Meteor.call("setContactGroupDefault", group._id);
	}

	getTypes(){
		return Options.findOne("requesttypes").vals;
	}

	updateEventRequestGroup(type,group){
		Meteor.call("setEventRequestGroupDefault", group._id,type.label);
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

										<SelectTeam
										 parent={this}
										 id={"contacttype"}
										 label={"Default Contact Type Team"}
										 unset={this.unset.bind(this)}
										 updateContact={this.updateContactGroup.bind(this)}
										 initialValue={this.getContactGroupDefault()}
										 ref={"contacttype"}
										 />
									 {this.getTypes().map((type)=>{
										 return <SelectTeam
															  parent={this}
															  id={type.label+"type"}
															  label={"Default "+type.label+" Event Request Team"}
															  unset={this.unset.bind(this)}
															  updateContact={this.updateEventRequestGroup.bind(this, type)}
															  initialValue={this.getTypeGroup(type.gid)}
															  />
									 })}

									 {/*}<label>Default Event Calendar View</label>
										<select
											value={Options.findOne("calendarview").val}
											onChange={this.changeCalendarView.bind(this)}
											className="form-control"
											ref="defaultView"
											>
											<option value={"agendaWeek"}>Week Agenda</option>
											<option value={"month"}>Month</option>
											<option value={"agendaDay"}>Day Agenda</option>
										</select>*/}
							</div>
						</div>
					</div>
					<div className="col s6" >
						<div className="divider"></div>
						<EventTagForm />
					</div>
					{/*<div className="row">
						<div className="col s12">
							<h2>All Options</h2>
								{this.getOptions().map( (option) => {
									return <Option key={option._id} option={option} />
								})}
						</div>
					</div>*/}
				</div>
				{/*checkPermission("removecontact")?
				<div className="row">
					<div className="col s6">
						<p>Perform User & Contact Merge</p>
						<a className="btn flat" onClick={this.merge.bind(this)}>Merge</a>
					</div>
				</div>:""*/}
			</div>
		)
	}
}
