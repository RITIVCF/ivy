import React, {Component} from 'react';



export default class EventName extends Component {
  updateName(event){
		event.preventDefault();
		console.log("Name: "+this.refs.name);
		Meteor.call("updateEventName", this.props.eid, this.refs.name.value);
		//this.state.value = this.refs.name;
	}

  handleNameChange(event){ // need one of these for each component
    this.setState({name:event.target.value});
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
  	var name = ev.name;

    return(
      <div>
        <label>Name</label>
        <input type="text" ref="name" value={name} onBlur={this.updateName.bind(this)} onChange={this.handleNameChange} />
      </div>
    )
  }
}
