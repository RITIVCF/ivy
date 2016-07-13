import React, {Component} from 'react';



export default class EventTags extends Component {
  updateTags(event){
		event.preventDefault();

		console.log(this.refs);
    /*
    this.refs.map((ref)=>{
      Meteor.call("updateEventTags",)
    })
		Meteor.call("updateEventTags", this.props.eid, this.refs);
    */
		//this.state.value = this.refs.name;
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
      return <label>{tag}<input type="checkbox" ref={tag} onClick={this.updateTags.bind(this)} checked={tags.includes(tag) ? "checked": ""} /></label>
    })}
  </div>
  )
  }
}
