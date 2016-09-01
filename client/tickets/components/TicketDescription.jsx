import React, {Component} from 'react';

var updDesc = _.throttle(
  function(tid, value){
    console.log(value);
    //Meteor.call("updateTicketDescription", tid, value);
    Meteor.call("TicketDescriptionLock", tid, true);
  },500);

var setDescFalse = _.debounce(function(thiz, tid, value){
  console.log(thiz.state.editting);
  thiz.setState({editting: false});
  Meteor.call("updateTicketDescription", tid, value);
  Meteor.call("TicketDescriptionLock", tid, false);
}, 1000);

export default class TicketDescription extends Component {
  constructor(props){
    super(props);
    this.state={
      description: props.ticket.description,
      descriptionlock: props.ticket.descriptionlock,
      editting: false
    }
  }

  handleDescriptionChange(event){ // need one of these for each component
    this.setState({description:event.target.value});
    // console.log("Event.target.value");
    // console.log(event.target.value);
    this.setState({editting: true});
    //console.log(this);
    setDescFalse(this, this.props.ticket._id, event.target.value);
    updDesc(this.props.ticket._id, event.target.value);
  }

  shouldComponentUpdate(nextProps,nextState){
    if(!this.state.editting){
      this.state.description = nextProps.ticket.description;
      this.state.descriptionlock = nextProps.ticket.descriptionlock;
    }
    return true;
  }


  render(){
    return(
      <div className="form-group">
        <label>Description</label><br/>
        <textarea ref="description"
          value={this.state.description}
          className="form-control"
          rows="5"
          disabled={this.state.descriptionlock}
          onChange={this.handleDescriptionChange.bind(this)} />
      </div>
    )
  }
}
