import React, {Component} from 'react';

export default class Event extends Component {
  constructor() {
    super();

  }

  go(){
    FlowRouter.go("/attendance/event/"+this.props.event._id);
  }


  render(){
    let event = this.props.event;
    return(
      <div key={event._id} className="panel panel-default">
          <div className="panel-heading" onClick={this.go.bind(this)}>
            <p>{event.name}</p>
            <p>{new moment(event.start.toISOString()).format("Do MMM YYYY")}</p>
          </div>
      </div>
    )
  }
}
