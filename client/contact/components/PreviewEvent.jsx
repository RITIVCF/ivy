import React, {Component} from 'react';



export default class PreviewEvent extends Component {

  goToEvent(){
    if(checkPermission('attendance')){
        FlowRouter.go("/attendance/event/"+this.props.event._id);
    }
  }

  selectThis(event){
    event.stopPropagation();
    this.props.select(this.props.event._id);
  }


  render(){
    let ev = this.props.event;
    return(
      <div className={this.props.selected?"card addBorderToCard":"card"}
        onClick={this.selectThis.bind(this)} onDoubleClick={this.goToEvent.bind(this)}>
        <div className="card-image">
          <img src="/images/defaultEventSmall.png"/>
          <span className="card-title">{ev.name}</span>
        </div>
        <div className="card-content">
          <p>{new moment(ev.start.toISOString()).format("DD MMM @ h:mmA")}</p>
          <p>Attendees: {ev.attendees.length}</p>
        </div>
      </div>

    )
  }
}
