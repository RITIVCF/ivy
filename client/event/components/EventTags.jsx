import React, {Component} from 'react';



export default class EventTags extends Component {
  updateTags(event){
		event.preventDefault();
    var tags = [];   // Initiate tags
    for (var property in this.refs) {   // iterate over properties
      if (this.refs.hasOwnProperty(property)) {   // make sure they aren't inhereted properties, only relevant
        if(this.refs[property].checked){ // is it checked?
            tags.push(property); // yes, add to array
        }
      }
    }
		Meteor.call("updateEventTags", this.props.eid, tags);  // write over array in database
	}



  getEvent(){
		//console.log(Events.find({_id: this.props.eid}).fetch());
		//return Events.find({_id: this.props.eid}).fetch();
		return Events.findOne(this.props.eid);
	}


  render(){
    let ev = this.getEvent();

  	if(!ev){
  		return (<div>Loading...</div>);
  	}
  	var tags = ev.tags;
    return(
      <div>
    {Meteor.settings.public.eventtags.map( (tag)=>{
      return <label>{tag}<input type="checkbox" ref={tag} readOnly={true} name={tag} onClick={this.updateTags.bind(this)} checked={tags.includes(tag) ? "checked": ""} /></label>
    })}
  </div>
  )
  }
}
