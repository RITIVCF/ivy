import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';



export default class CampusAffiliations extends TrackerReact(React.Component){
  updateTags(event){
		event.preventDefault();
    var tags = [];   // Initiate tags
    for (var property in this.refs) {   // iterate over properties
      if (this.refs.hasOwnProperty(property)) {   // make sure they aren't inhereted properties, only relevant
        if(this.refs[property].checked){ // is it checked?
            Meteor.call("updateContactAffiliations", this.props.contact._id, property, false);
        }
        else{
          Meteor.call("updateContactAffiliations", this.props.contact._id, property, true);  // true means remove
        }
      }
    }

	}



  getContact(){
		//console.log(Events.find({_id: this.props.eid}).fetch());
		//return Events.find({_id: this.props.eid}).fetch();
		return Contacts.findOne({_id: Meteor.user().contact});
	}

  getAffiliations(){
    return Options.findOne({_id:"campusaffiliations"}).vals;
  }


  render(){
    /*let contact = this.getContact();

  	if(!contact){
  		return (<div>Loading...</div>);
  	}*/
    if(!this.props.contact.affiliations){
      return (<div></div>)
    }
  	var tags = this.props.contact.affiliations;
    console.log(this.props.subscription);
    console.log(this.props.subscription.ready());
    return(
      <div>
    {this.props.subscription.ready() ? this.getAffiliations().map( (tag)=>{
      return <li key={tag}><label >{tag}:
        <input
          type="checkbox"
          ref={tag}
          readOnly={true}
          disabled={this.props.disabled}
          name={tag}
          onClick={this.updateTags.bind(this)}
          checked={(tags.indexOf(tag) != -1) ? "checked": ""}
        /></label></li>
    }) : <div></div>}
  </div>
  )
  }
}
