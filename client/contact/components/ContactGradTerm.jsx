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
    this.props.contact.setGradTerm(event.target.value.trim());
	}

  getGradTerms(){
    return Options.findOne({_id:"gradterms"}).vals;
  }

  render() {
    return (
      <div >
      <label htmlFor="gradterm">Expected Grad Term:</label>
        {Options.findOne("gradterms").vals ?
      <select
        id="gradterm"
        className="browser-default"
        value={this.props.contact.getGradTerm()}
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
