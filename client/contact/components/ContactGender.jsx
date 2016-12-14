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
    Meteor.call("updateGender", this.props.contact._id, event.target.value);
	}


  render() {
    if(!this.props.contact.gender){
      return(<div></div>)
    }
    return (
      <div >

      <select
        className="form-control"
        ref="gender"
        value={this.props.contact.gender}
        disabled={this.props.disabled}
        onChange={this.update.bind(this)}>
          <option value={"na"}>Not Specified</option>
          <option value={"male"}>Male</option>
          <option value={"female"}>Female</option>
      </select>
      <label>Sex (Gender):</label>
    </div>
    )
  }
}
