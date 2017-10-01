import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import SelectGroup from '../sharedcomponents/SelectGroup.jsx';
import { anyUnpublishedRecurring } from '/lib/events.js';
import moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';

export default class RecurringEventForm extends React.Component {

  constructor(props){
    super(props);
    momentLocalizer(moment);
    this.state = {
			enddate: new Date(),
			recurGroup: false,
			recurModalOpen: false
    };
  }

	setRepeat() {
		if (this.state.recurGroup) {
			this.props.onSubmit();
			Meteor.call('createEventRecurrence', this.props.event._id, this.state.enddate, this.state.recurGroup._id, (error) => {
				if(error) {
					Materialize.toast("There was an error creating the recurring events", 2000);
				} else {
					Materialize.toast("Created recurring events", 2000);
				}
			});
		} else if (this.props.event.tags.includes("Small Group")) {
			Materialize.toast("Associated small group is required", 2000);
		} else {
			this.props.onSubmit();
			Meteor.call('createEventRecurrence', this.props.event._id, this.state.enddate, this.state.recurGroup._id, (error) => {
				if(error) {
					Materialize.toast("There was an error creating the recurring events", 2000);
				} else {
					Materialize.toast("Created recurring events", 2000);
				}
			});
		}
	}

	publishAllRecur() {
		this.props.onSubmit();
		Meteor.call('publishAllRecurEvents', this.props.event._id, (error) => {
			if(error) {
				Materialize.toast("There was an error publishing all recurring events", 2000);
			} else {
				Materialize.toast("Published all recurring events", 2000);
			}
		});
	}

	unpublishAllRecur() {
		this.props.onSubmit();
		Meteor.call('unpublishAllRecurEvents', this.props.event._id, (error) => {
			if(error) {
				Materialize.toast("There was an error unpublishing all recurring events", 2000);
			} else {
				Materialize.toast("Unpublished all recurring events", 2000);
			}
		});
	}

	deleteAllRecur() {
		let result = window.confirm("Are you sure you want to delete all recurring events? *This action cannot be undone.*");
		if(result == true){
			this.props.onSubmit();
			Meteor.call('deleteAllRecurEvents', this.props.event._id, (error) => {
				if(error) {
					Materialize.toast("There was an error deleting all recurring events", 2000);
				} else {
					Session.set("evselected","");
					routeTo("events");
				}
			});
		}
	}

  setEndDate(value) {
    this.setState({enddate: value});
  }

  unset(){

	}

	addGroup(group){
		this.setState({recurGroup: group});
	}

	getGroups(){
		return Groups.find({_id:{$in:this.props.page.groups}}).fetch();
	}

  render() {
		const ev = this.props.event;
		let recurTrue = false;
		if (!!ev.recurId) {
			recurTrue = true;
			let recurId = ev.recurId;
		}
    return (
			<div>
				{
					recurTrue?<div>{
						anyUnpublishedRecurring(ev.recurId)?<a className="btn" onClick={this.publishAllRecur.bind(this)}>Publish All</a>:
						<a className="btn" onClick={this.unpublishAllRecur.bind(this)}>Unpublish All</a>
					}
						<a className="btn red" onClick={this.deleteAllRecur.bind(this)}>Delete All</a>
					</div>:<div>
						<DateTimePicker ref="start"
							defaultValue={this.state.enddate}
							onChange={this.setEndDate.bind(this)}
						/>
						{this.props.event.tags.includes("Small Group")&&
							<SelectGroup
								parent={this}
								id={this.props.event.id}
								unset={this.unset.bind(this)}
								updateContact={this.addGroup.bind(this)}
								initialValue={""}
								ref={"group"}
								ingroup={true}
							/>
						}
					</div>
				}
				{!recurTrue&&<a className="btn" onClick={this.setRepeat.bind(this)}>Repeat</a>}
			</div>
    )
  }
}
