import React, {Component} from 'react';

export default class Event extends Component {
  constructor() {
    super();


  }

  go(){
    if(checkPermission("attendance")){
        FlowRouter.go("/events/attendance/"+this.props.event._id);
    }
  }


  render(){
    let event = this.props.event;
    return(
      <li className="collection-item" id={checkPermission("attendance")?"showhim":""} onDoubleClick={this.go.bind(this)}>
        {event.name}
        {checkPermission("attendance")&&
        <a   onClick={this.go.bind(this)}
            className="btn waves-effect waves-light right"
            id={checkPermission("attendance")?"showme":""}>View</a>}
        <br/>
        {new moment(event.start.toISOString()).format("DD MMM @ h:mmA")}
      </li>
    )
  }
}
