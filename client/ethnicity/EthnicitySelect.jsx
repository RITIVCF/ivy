import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SelectOption from '../sharedcomponents/SelectOption.jsx';

export default class EthnicitySelect extends TrackerReact(React.Component) {
  constructor() {
    super();

    this.state = {selected: ""};
  }

  update(event){
		event.preventDefault();
    this.setState({value: event.target.value});
    console.log(event.target.value);
    if(!this.props.intl.checked){  // save ethnicity
      //console.log(this.state.value);
      Meteor.call("updateEthnicity", this.props.user._id, event.target.value);
    }
    else{
        //Meteor.call("updateUserIntl", this.refs.intl.checked);
        //Meteor.call("updateEthnicity", "");
    }

	}


  render() {

    return (
      <select className="ethnicities" ref="ethn" value={this.props.selected} onChange={this.update.bind(this)}>
          {Meteor.settings.public.ethnicities.map( (ethnicity)=>{
              return <SelectOption key={ethnicity} value={ethnicity}  />
          })}
      </select>
    )
  }
}
