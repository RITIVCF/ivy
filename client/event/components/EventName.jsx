import React, {Component} from 'react';

var updName = _.throttle(
  function(eid, value)
  {//console.log(value);
    Meteor.call("updateEventName", eid, value);
    Meteor.call("EventNameLock", eid, true);
  },500);

var setNameFalse = _.debounce(function(thiz, eid){
  //console.log(thiz.state.editting);
  thiz.setState({editting: false});
  Meteor.call("EventNameLock", eid, false);
}, 1000);

export default class EventName extends Component {
  constructor(props){
    super(props);
    this.state={
      name: props.ev.name,
      namelock: props.ev.namelock,
      editting: false,
      editstate: false
    }
  }
  updateName(event){
		event.preventDefault();
		//console.log("Name: "+this.refs.name);
		Meteor.call("updateEventName", this.props.eid, this.refs.name.value);
		//this.state.value = this.refs.name;
	}

  handleNameChange(event){ // need one of these for each component
    this.setState({name:event.target.value});
    // //console.log("Event.target.value");
    // //console.log(event.target.value);
    this.setState({editting: true});
    updName(this.props.ev._id, event.target.value);
    ////console.log(this);
    setNameFalse(this, this.props.ev._id);
  }

  shouldComponentUpdate(nextProps,nextState){
    if(!this.state.editting){
      this.state.name = nextProps.ev.name;
      this.state.namelock = nextProps.ev.namelock;
    }
    return true;
  }

  toggle(){
    if(!this.props.perm){
      return;
    }
    this.setState({editstate: !this.state.editstate});
  }

  getEvent(){
		////console.log(Events.find({_id: this.props.eid}).fetch());
		//return Events.find({_id: this.props.eid}).fetch();
		return Events.findOne(this.props.eid);
	}


  render(){
    if(!this.state.editstate){
      return <span onClick={this.toggle.bind(this)} className="card-title">{this.state.name}</span>
    }
    return(
      <div className="form-group">
        <label>Name</label>
        <input type="text"
          className="form-control"
          ref="name"
          value={this.state.name}
          onBlur={this.toggle.bind(this)}
          disabled={this.state.namelock||!this.props.perm}
          onChange={this.handleNameChange.bind(this)}
           />
      </div>
    )
  }
}
