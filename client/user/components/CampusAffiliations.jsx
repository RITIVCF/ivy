import React, {Component} from 'react';



export default class CampusAffiliations extends Component {
  updateTags(event){
		event.preventDefault();
    var tags = [];   // Initiate tags
    for (var property in this.refs) {   // iterate over properties
      if (this.refs.hasOwnProperty(property)) {   // make sure they aren't inhereted properties, only relevant
        if(this.refs[property].checked){ // is it checked?
            Meteor.call("updateUserAffiliations", this.props.user._id, property, false);
        }
        else{
          Meteor.call("updateUserAffiliations", this.props.user._id, property, true);  // true means remove
        }
      }
    }

	}



  getUser(){
		//console.log(Events.find({_id: this.props.eid}).fetch());
		//return Events.find({_id: this.props.eid}).fetch();
		return Meteor.user();
	}


  render(){
    /*let user = this.getUser();

  	if(!user){
  		return (<div>Loading...</div>);
  	}*/
    if(!this.props.user.affiliations){
      return (<div></div>)
    }
  	var tags = this.props.user.affiliations;
    return(
      <div>
    {Meteor.settings.public.campusaffiliations.map( (tag)=>{
      return <label key={tag} >{tag}:<input type="checkbox" ref={tag} readOnly={true} name={tag} onClick={this.updateTags.bind(this)} checked={tags.includes(tag) ? "checked": ""} /></label>
    })}
  </div>
  )
  }
}
