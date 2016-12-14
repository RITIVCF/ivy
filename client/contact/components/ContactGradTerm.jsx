import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import SelectOption from '../../sharedcomponents/SelectOption.jsx';

export default class ContactGradTerm extends TrackerReact(React.Component) {
  constructor() {
    super();

    this.state = {selected: ""};
  }

  update(event){
		event.preventDefault();
    this.setState({value: event.target.value});
    //console.log(event.target.value);
    Meteor.call("updateGradTerm", this.props.contact._id, event.target.value);
	}

  getGradTerms(){
    return Options.findOne({_id:"gradterms"}).vals;
  }

  render() {
    if(!this.props.contact.gradterm){
  		return (<div></div>);
  	}
    return (
      <div >
      <label htmlFor="gradterm">Expected Grad Term:</label>
        {Options.findOne("gradterms").vals ?
      <select
        id="gradterm"
        className="browser-default"
        value={this.props.contact.gradterm}
        disabled={this.props.disabled}
        onChange={this.update.bind(this)}>
          {this.getGradTerms().map( (term)=>{
              return <SelectOption key={term} value={term} displayvalue={term}  />
          })}
      </select>:""}
    </div>
    )
  }
}
