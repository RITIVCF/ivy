import React, {Component} from 'react';

var updDesc = _.throttle(
  function(tid, value){
    Meteor.call("TicketDescriptionLock", tid, true);
  },500);

var setDescFalse = _.debounce(function(thiz, tid, value){
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

  componentDidMount(){
    $('textarea').trigger('autoresize');
  }

  handleDescriptionChange(event){ // need one of these for each component
    this.setState({description:event.target.value});
    this.setState({editting: true});

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
      <div className="input-field">
        <textarea ref="description"
          value={this.state.description}
          id="ticdesc"
          className="materialize-textarea"
          rows="5"
          disabled={this.state.descriptionlock}
          onChange={this.handleDescriptionChange.bind(this)} />
        <label htmlFor="ticdesc">Description</label>
      </div>
    )
  }
}
