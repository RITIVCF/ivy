import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import EthnicitySelect from '../../ethnicity/EthnicitySelect.jsx';



export default class UserIntlEthnicity extends TrackerReact(React.Component) {
  update(event){
		event.preventDefault();
    if(!this.refs.intl.checked){
      Meteor.call("updateUserIntl", this.props.user._id, this.refs.intl.checked);
      if(this.refs.ethn.selected)
      {
          Meteor.call("updateEthnicity", this.props.user._id, this.refs.ethn.selected);
      }
    }
    else{
        Meteor.call("updateUserIntl", this.props.user._id, this.refs.intl.checked);
        Meteor.call("updateEthnicity", this.props.user._id, "");
    }


	}



  getUser(){
		//console.log(Events.find({_id: this.props.eid}).fetch());
		//return Events.find({_id: this.props.eid}).fetch();
		return Meteor.user();
	}




  render(){
    let user = this.props.user;

  	if(typeof user.intl === 'undefined'){
  		return (<div>Loading...</div>);
  	}

    return(
      <div>
        <h4>Ethnicity:</h4>
      <label>International Student:
        <input
          type="checkbox"
          ref="intl"
          readOnly={true}
          onClick={this.update.bind(this)}
          checked={user.intl}
        />
      </label>
      {!user.intl ?
      <label>
        Ethnicity:
        <EthnicitySelect selected={user.ethn} ref="ethn" user={user} intl={user.intl} />
      </label>
      :
      ""
    }
  </div>
  )
  }
}
