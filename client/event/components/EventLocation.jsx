import React, {Component} from 'react';

var updLocation = _.throttle(
  function(eid, value)
  {console.log(value);Meteor.call("updateEventLocation", eid, value);
    Meteor.call("EventLocationLock", eid,true);
  },500);

var setLocationFalse = _.debounce(function(thiz, eid){
  console.log(thiz.state.editting);
  thiz.setState({editting: false});
  Meteor.call("EventLocationLock", eid, false);
}, 1000);

export default class EventLocation extends Component {
  constructor(props){
    super(props);
    this.state={
      location: props.ev.location,
      locationlock: props.ev.locationlock,
      editting: false
    }
  }

  updateLocation(event){
    event.preventDefault();
    Meteor.call("updateEventLocation", this.props.eid, this.refs.location.value);
    //this.state.value = this.refs.name;
  }

  handleLocationChange(event){ // need one of these for each component
    this.setState({location:event.target.value});
    this.setState({editting: true});
    updLocation(this.props.ev._id, event.target.value);
    //console.log(this);
    setLocationFalse(this, this.props.ev._id);
  }

  shouldComponentUpdate(nextProps,nextState){
    if(!this.state.editting){
      this.state.location = nextProps.ev.location;
      this.state.locationlock = nextProps.ev.locationlock;
    }
    return true;
  }

  getEvent(){
		//console.log(Events.find({_id: this.props.eid}).fetch());
		//return Events.find({_id: this.props.eid}).fetch();
		return Events.findOne(this.props.eid);
	}


  render(){

    return(
      <div>
        <label>Location</label>
				<input type="text"
          ref="location"
          value={this.state.location}
          disabled={this.state.locationlock||!this.props.perm}
          onChange={this.handleLocationChange.bind(this)} />
      </div>
    )
  }
}
