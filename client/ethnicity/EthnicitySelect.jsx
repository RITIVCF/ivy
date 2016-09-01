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
      Meteor.call("updateEthnicity", this.props.contact._id, event.target.value);
    }
    else{
        //Meteor.call("updateContactIntl", this.refs.intl.checked);
        //Meteor.call("updateEthnicity", "");
    }

	}

  getEthnicities(){
    return Options.findOne({_id:"ethnicities"}).vals;
  }

  render() {
    if(!this.props.subscription.ready()){
      return (<div></div>);
    }
    return (
      <select className="form-control" ref="ethn" value={this.props.selected} onChange={this.update.bind(this)} disabled={this.props.disabled}>
        <option value={""}></option>
          {this.getEthnicities().map( (ethnicity)=>{
              return <SelectOption key={ethnicity} value={ethnicity} displayvalue={ethnicity} />
          })}
      </select>
    )
  }
}
