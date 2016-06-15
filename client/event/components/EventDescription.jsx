import React, {Component} from 'react';



export default class EventDescription extends Component {
  updateDescription(event){
		event.preventDefault();
		Meteor.call("updateEventDescription", this.props.eid, this.refs.description.value);
		//this.state.value = this.refs.description;
	}

  handleDescriptionChange(event){ // need one of these for each component
    this.setState({description:event.target.value});
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
  	var description = ev.description;

    return(
      <div>
        <label>Description</label>
        <textarea ref="description" value={description} onBlur={this.updateDescription.bind(this)} onChange={this.handleDescriptionChange} />
      </div>
    )
  }
}
