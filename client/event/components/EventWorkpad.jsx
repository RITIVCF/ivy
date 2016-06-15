import React, {Component} from 'react';



export default class EventWorkpad extends Component {
  updateWorkpad(event){
		event.preventDefault();
		Meteor.call("updateEventWorkpad", this.props.eid, this.refs.workpad.value);
		//this.state.value = this.refs.name;
	}

  handleWorkpadChange(event){ // need one of these for each component
    this.setState({workpad:event.target.value});
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
  	var workpad = ev.workpad;

    return(
      <div>
        <label>Workspace</label>
        <textarea ref="workpad" onBlur={this.updateWorkpad.bind(this)} onChange={this.handleWorkpadChange} >{workpad}</textarea>
      </div>
    )
  }
}
