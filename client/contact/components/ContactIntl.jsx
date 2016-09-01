import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import EthnicitySelect from '../../ethnicity/EthnicitySelect.jsx';



export default class ContactIntlEthnicity extends TrackerReact(React.Component) {
  update(event){
		event.preventDefault();
    if(!this.refs.intl.checked){
      Meteor.call("updateContactIntl", this.props.contact._id, this.refs.intl.checked);
      if(this.refs.ethn.selected)
      {
          Meteor.call("updateEthnicity", this.props.contact._id, this.refs.ethn.selected);
      }
    }
    else{
        Meteor.call("updateContactIntl", this.props.contact._id, this.refs.intl.checked);
        Meteor.call("updateEthnicity", this.props.contact._id, "");
    }


	}


  render(){
    let contact = this.props.contact;

  	if(typeof contact.intl === 'undefined'){
  		return (<div>Loading...</div>);
  	}

    return(
      <div className="form-group">
      <label>International Student:
        <input
          type="checkbox"
          ref="intl"
          className="form-control"
          readOnly={true}
          disabled={this.props.disabled}
          onClick={this.update.bind(this)}
          checked={contact.intl}
        />
      </label>
      <br/>
      {!contact.intl ?
      <label>
        Ethnicity:
        <EthnicitySelect
          selected={contact.ethn}
          ref="ethn"
          contact={contact}
          disabled={this.props.disabled}
          intl={contact.intl}
          subscription={this.props.subscription} />
      </label>
      :
      ""
    }
  </div>
  )
  }
}
