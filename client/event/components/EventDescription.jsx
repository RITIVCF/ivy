import React, {Component} from 'react';

var updDescription = _.throttle(
  function(eid, value)
  {console.log(value);Meteor.call("updateEventDescription", eid, value);
    Meteor.call("EventDescriptionLock", eid, true);
  },500);

var setDescFalse = _.debounce(function(thiz, eid){
  console.log(thiz.state.editting);
  thiz.setState({editting: false});
  Meteor.call("EventDescriptionLock", eid, false);
}, 1000);


export default class EventDescription extends Component {
  constructor(props){
    super(props);
    this.state={
      description: props.ev.description,
      descriptionlock: props.ev.descriptionlock,
      editting: false
    }
  }
  updateDescription(event){
		event.preventDefault();
		Meteor.call("updateEventDescription", this.props.eid, this.refs.description.value);
		//this.state.value = this.refs.description;
	}

  handleDescriptionChange(event){ // need one of these for each component
    this.setState({description:event.target.value});
    this.setState({editting: true});
    updDescription(this.props.ev._id, event.target.value);
    setDescFalse(this, this.props.ev._id);
  }

  shouldComponentUpdate(nextProps, nextState){
    if(!this.state.editting){
      this.state.description = nextProps.ev.description;
      this.state.descriptionlock = nextProps.ev.descriptionlock;
    }
    return true;
  }

  getEvent(){
		//console.log(Events.find({_id: this.props.eid}).fetch());
		//return Events.find({_id: this.props.eid}).fetch();
		return Events.findOne(this.props.eid);
	}


  render(){
  /*  let ev = this.getEvent();

  	if(!ev){
  		return (<div>Loading...</div>);
  	}
  	var description = ev.description;
    */
    return(
      <div className="form-group">
        <label>Description</label>
        <textarea ref="description"
          className="form-control"
          rows="3"
          value={this.state.description}
          onChange={this.handleDescriptionChange.bind(this)}
          disabled={this.state.descriptionlock||!this.props.perm}
          />
      </div>
    )
  }
}
