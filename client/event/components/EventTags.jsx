import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Tag from './Tag.jsx';


export default class EventTags extends TrackerReact(React.Component) {
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
		Meteor.call("updateEventTags", this.props.ev._id, tags);  // write over array in database
	}



  getEvent(){
		//console.log(Events.find({_id: this.props.eid}).fetch());
		//return Events.find({_id: this.props.eid}).fetch();
		return Events.findOne(this.props.eid);
	}

  getTags(){

    //return Options.findOne({_id:"eventtags"}).vals;
  }

  submit(event){
    event.preventDefault();
    Meteor.call("addEventTag", this.props.ev._id, this.refs.tag.value);
    this.refs.tag.value="";
  }


  render(){
    let ev = this.props.ev;//this.getEvent();

  	var tags = ev.tags;
    return(
      <div style={{backgroundColor: "white", outline:"grey solid 1px", padding: "5px"}}>
        <form onSubmit={this.submit.bind(this)}>
          <input type="text" ref="tag" placeholder="+Tag" /> {/*LOOK INTO REACT-WIDGETS MULTISELECT*/}
        </form>
    {/*this.props.subscription.ready() ? */// this.getTags().map( (tag)=>{
      ev.tags.map((tag)=>{
        return <Tag key={tag} eid={ev._id} tag={tag} />
    }) /* : <div></div>*/}
  </div>
  )
  }
}
