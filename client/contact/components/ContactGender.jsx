import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class ContactGender extends TrackerReact(React.Component) {
  constructor() {
    super();

    this.state = {selected: ""};
  }

  update(event){
		event.preventDefault();
    this.setState({value: event.target.value});
    //console.log(event.target.value);
    this.props.contact.setGender(event.target.value.trim());
	}


  render() {
    return (
      <div >
        <label htmlFor="gender">Sex (Gender):</label>
      <select
        ref="gender"
        id="gender"
        className="browser-default"
        value={this.props.contact.getGender()}
        disabled={this.props.disabled}
        onChange={this.update.bind(this)}>
          <option value={"na"}>Not Specified</option>
          <option value={"male"}>Male</option>
          <option value={"female"}>Female</option>
      </select>
    </div>
    )
  }
}
