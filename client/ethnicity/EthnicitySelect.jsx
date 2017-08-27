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
    if(!this.props.intl.checked){  // save ethnicity
      Meteor.call("updateEthnicity", this.props.contact._id, event.target.value);
    }

	}

  getEthnicities(){
    return Options.findOne({_id:"ethnicities"}).vals;
  }

  render() {
    if(!Options.findOne("ethnicities").vals){
      return (<div></div>);
    }
    return (
      <select className="browser-default" ref="ethn" value={this.props.selected} onChange={this.update.bind(this)} disabled={this.props.disabled}>
        <option value={""}></option>
          {this.getEthnicities().map( (ethnicity)=>{
              return <SelectOption key={ethnicity} value={ethnicity} displayvalue={ethnicity} />
          })}
      </select>
    )
  }
}
