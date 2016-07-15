import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SelectOption from '../../sharedcomponents/SelectOption.jsx';

export default class UserGradTerm extends TrackerReact(React.Component) {
  constructor() {
    super();

    this.state = {selected: ""};
  }

  update(event){
		event.preventDefault();
    this.setState({value: event.target.value});
    //console.log(event.target.value);
    Meteor.call("updateGradTerm", this.props.user._id, event.target.value);
	}


  render() {
    if(!this.props.user.gradterm){
  		return (<div></div>);
  	}
    return (
      <div>
        <h4>Expected Grad Term:</h4>
      <select className="gradterm" value={this.props.user.gradterm} onChange={this.update.bind(this)}>
          {Meteor.settings.public.gradterms.map( (term)=>{
              return <SelectOption key={this.props.user.gradterm} value={this.props.user.gradterm}  />
          })}
      </select>
    </div>
    )
  }
}
