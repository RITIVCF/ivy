import React, {Component} from 'react';

var updSub = _.throttle(
  function(tid, value){
    //console.log(value);
    //Meteor.call("updateTicketSubject", tid, value);
    Meteor.call("TicketSubjectLock", tid, true);
  },500);

var setSubFalse = _.debounce(function(thiz, tid, value){
  //console.log(thiz.state.editting);
  thiz.setState({editting: false});
  Meteor.call("updateTicketSubject", tid, value);
  Meteor.call("TicketSubjectLock", tid, false);
}, 1000);

export default class TicketSubject extends Component {
  constructor(props){
    super(props);
    this.state={
      subject: props.ticket.subject,
      subjectlock: props.ticket.subjectlock,
      editting: false
    }
  }

  handleSubjectChange(event){ // need one of these for each component
    this.setState({subject:event.target.value});
    // console.log("Event.target.value");
    // console.log(event.target.value);
    this.setState({editting: true});
    //console.log(this);
    setSubFalse(this, this.props.ticket._id, event.target.value);
    updSub(this.props.ticket._id, event.target.value);
  }

  shouldComponentUpdate(nextProps,nextState){
    if(!this.state.editting){
      this.state.subject = nextProps.ticket.subject;
      this.state.subjectlock = nextProps.ticket.subjectlock;
    }
    return true;
  }


  render(){
    return(
      <div className="form-group">
        <label>Subject</label>
        <input type="text"
          ref="subject"
          className="form-control"
          value={this.state.subject}
          disabled={this.state.subjectlock}
          onChange={this.handleSubjectChange.bind(this)} />
      </div>
    )
  }
}
