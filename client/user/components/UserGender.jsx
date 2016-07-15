import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class UserGender extends TrackerReact(React.Component) {
  constructor() {
    super();

    this.state = {selected: ""};
  }

  update(event){
		event.preventDefault();
    this.setState({value: event.target.value});
    //console.log(event.target.value);
    Meteor.call("updateGender", this.props.user, event.target.value);
	}


  render() {
    if(!this.props.user.gender){
      return(<div></div>)
    }
    return (
      <div>
        <h4>Sex (Gender):</h4>
      <select className="gender" ref="gender" value={this.props.user.gender} onChange={this.update.bind(this)}>
          <option value={"na"}>Not Specified</option>
          <option value={"male"}>Male</option>
          <option value={"female"}>Female</option>
      </select>
    </div>
    )
  }
}
