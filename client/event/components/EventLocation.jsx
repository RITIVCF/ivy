import React, {Component} from 'react';

export default class EventLocation extends Component {
  updateLocation(event){
    event.preventDefault();
    Meteor.call("updateEventLocation", this.props.eid, this.refs.location.value);
    //this.state.value = this.refs.name;
  }
  handleLocationChange(event){ // need one of these for each component
    this.setState({location:event.target.value});
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
  	var location = ev.location;

    return(
      <div>
        <label>Location</label>
				<input type="text" ref="location" value={location} onBlur={this.updateLocation.bind(this)} onChange={this.handleLocationChange} />
      </div>
    )
  }
}
