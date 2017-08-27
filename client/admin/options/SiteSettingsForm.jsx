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
			<Row>
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
						</div>
					</div>
				</div>
				<div className="col s6" >
					<div className="divider"></div>
					<EventTagForm />
				</div>
			</Row>
		)
	}
}
