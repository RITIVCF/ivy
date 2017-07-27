import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Tag from './Tag.jsx';
import SelectTag from '../../sharedcomponents/SelectTag.jsx';


export default class EventTags extends TrackerReact(React.Component) {
  constructor(){
    super();
    this.state ={value: ""};
  }
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

  submit(tag){
    //event.preventDefault();
    console.log("submitted");
    console.log(tag.target.value);

    Meteor.call("addEventTag", this.props.ev._id, tag.target.value);
    //this.refs.tag.initialValue="";
    //this.setState({value: ""});


  }

  fillTags() {
    return Options.findOne("eventtags").vals;
  }

  // setTextValue(txt){
  //   this.setState({value: txt});
  // }

  unset(){

  }


  render(){
    let ev = this.props.ev;//this.getEvent();

    //browser-default

  	var tags = ev.tags;
    return(
      <div>
        {this.props.perm&&
          <select ref="tag" className="browser-default" value={tags[0]} onChange={this.submit.bind(this)}>
              <option value={""}>Select an event type</option>
              {this.fillTags().map( (val) => {
                return (<option value={val.tag}>{val.tag}</option>)
              })}
          </select>

        }
      </div>
  )
  }
}
