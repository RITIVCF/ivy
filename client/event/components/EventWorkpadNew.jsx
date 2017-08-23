import React, {Component} from 'react';

var updWorkpad = _.throttle(
  function(eid, value)
  {
    Meteor.call("updateEventWorkpad", eid, value);
    Meteor.call("EventWorkpadLock", eid, true);
  },500);

var setWorkPadFalse = _.debounce(function(thiz, eid){
  thiz.setState({editting: false});
  Meteor.call("EventWorkpadLock", eid, false);
}, 1000);

export default class EventWorkpadNew extends Component {
  constructor(props){
    super(props);
    this.state={
      workpad: props.ev.workpad,
      workpadlock: props.ev.workpadlock,
      editting: false
    }
  }

  updateWorkpad(event){
		event.preventDefault();
		Meteor.call("updateEventWorkpad", this.props.eid, this.refs.workpad.value);
	}

  handleWorkpadChange(event){ // need one of these for each component
    this.setState({workpad:event.target.value});
    this.setState({editting: true});
    updWorkpad(this.props.ev._id, event.target.value);
    setWorkPadFalse(this, this.props.ev._id);

  }

  shouldComponentUpdate(nextProps,nextState){
    if(!this.state.editting){
      this.state.workpad = nextProps.ev.workpad;
      this.state.workpadlock = nextProps.ev.workpadlock;
    }
    return true;
  }

  getEvent(){
		return Events.findOne(this.props.eid);
	}


  render(){
    return(
      <div className="form-group">
        <label>Workspace</label><br/>
        <textarea ref="workpad"
          className="form-control"
          rows="12"
          onChange={this.handleWorkpadChange.bind(this)}
          value={this.state.workpad}
          disabled={this.state.workpadlock||!this.props.perm} />
      </div>
    )
  }
}
