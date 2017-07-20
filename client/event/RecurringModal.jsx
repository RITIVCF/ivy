import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import SelectGroup from '../sharedcomponents/SelectGroup.jsx';
import moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';

export default class RecurringModal extends React.Component {

  constructor(props){
    super(props);
    momentLocalizer(moment);
    this.state = {
    };
  }

  setEndDate(value) {
    this.props.onpick(value);
  }

  unset(){

	}

	addGroup(group){
		this.props.group(group);
	}

	getGroups(){
		return Groups.find({_id:{$in:this.props.page.groups}}).fetch();
	}

  render() {
    return (
      <div>
        <DateTimePicker ref="start"
          defaultValue={this.props.defaultEndDate}
          onChange={this.setEndDate.bind(this)}
          />
        {this.props.ev.tags.includes("Small Group")&&
          <SelectGroup
            parent={this}
            id={this.props.ev.id}
            unset={this.unset.bind(this)}
            updateContact={this.addGroup.bind(this)}
            initialValue={""}
            ref={"group"}
            ingroup={true}
            />
          }
      </div>
    )
  }




}
