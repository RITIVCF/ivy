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
		Meteor.call("updateEventTags", this.props.ev._id, tags);  // write over array in database
	}



  getEvent(){
		//console.log(Events.find({_id: this.props.eid}).fetch());
		//return Events.find({_id: this.props.eid}).fetch();
		return Events.findOne(this.props.eid);
	}

  getTags(){
    return Options.findOne({_id:"eventtags"}).vals;
  }


  render(){
    let ev = this.props.ev;//this.getEvent();

  	if(!ev){
  		return (<div>Loading...</div>);
  	}
  	var tags = ev.tags;
    return(
      <div className="form-group">
    {/*this.props.subscription.ready() ? */ this.getTags().map( (tag)=>{
      return <li key={tag}><label>{tag}
        <input
          type="checkbox"
          ref={tag}
          readOnly={true}
          name={tag}
          disabled={!this.props.perm}
          onClick={this.updateTags.bind(this)}
          checked={(tags.indexOf(tag) != -1) ? "checked": ""}
        /></label></li>
    }) /* : <div></div>*/}
  </div>
  )
  }
}
