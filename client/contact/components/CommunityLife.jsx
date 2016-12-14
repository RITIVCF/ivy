import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import CommLifeTag from './CommLifeTag.jsx';


export default class CommunityLife extends TrackerReact(React.Component){
  // updateTags(event){
	// 	event.preventDefault();
  //   var tags = [];   // Initiate tags
  //   for (var property in this.refs) {   // iterate over properties
  //     if (this.refs.hasOwnProperty(property)) {   // make sure they aren't inhereted properties, only relevant
  //       if(this.refs[property].checked){ // is it checked?
  //           Meteor.call("updateCommunityLife", this.props.contact._id, property, false);
  //       }
  //       else{
  //           Meteor.call("updateCommunityLife", this.props.contact._id, property, true);
  //       }
  //     }
  //   }
	// }



  // getContact(){
	// 	//console.log(Events.find({_id: this.props.eid}).fetch());
	// 	//return Events.find({_id: this.props.eid}).fetch();
	// 	return Contacts.findOne({_id: Meteor.user().contact});
	// }

  getCommunityLife(){
    return Options.findOne({_id:"communitylife"}).vals;
  }


  render(){
    /*let contact = this.getContact();

  	if(!contact){
  		return (<div>Loading...</div>);
  	}*/
    if(!this.props.contact.communitylife){
      return (<div></div>)
    }
  	var tags = this.props.contact.communitylife;
    return(
      <div>
    {Options.findOne("communitylife").vals ? this.getCommunityLife().map( (tag)=>{
      return <CommLifeTag key={tag}
        tag={tag}
        contact={this.props.contact}
        checked={(tags.indexOf(tag) != -1)}
        disabled={this.props.disabled} />
    }):<div></div>}
  </div>
  )
  }
}
