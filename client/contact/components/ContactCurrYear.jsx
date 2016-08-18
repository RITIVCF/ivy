import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SelectOption from '../../sharedcomponents/SelectOption.jsx';

export default class ContactCurrYear extends TrackerReact(React.Component) {
  constructor() {
    super();

    this.state = {selected: ""};
  }

  update(event){
		event.preventDefault();
    this.setState({value: event.target.value});
    //console.log(event.target.value);
    Meteor.call("updateCurrYear", this.props.contact._id, event.target.value);
	}


  render() {
    return (
      <div>
        <h4>Current Year Level:</h4>
      <select
        className="select"
        value={this.props.contact.curryear}
        disabled={this.props.disabled}
        onChange={this.update.bind(this)}>
          <option value={"1"}>1</option>
          <option value={"2"}>2</option>
          <option value={"3"}>3</option>
          <option value={"4"}>4</option>
          <option value={"5"}>5</option>
          <option value={"6"}>6</option>
          <option value={"7"}>7</option>
      </select>
    </div>
    )
  }
}
