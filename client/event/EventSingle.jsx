import React, {Component} from 'react';

export default class EventSingle extends Component {
  openEvent(event){
    event.preventDefault();
    // opens event in event workspace
  }
  render() {
    // This area needs styled, so however we need to do it to style
    // it correctly. Review Alex's mock ups and Jeanie's drawings.-->
    // {this.props.ivevent.createdAt.toDateString()}
    return (
      <div onClick={this.openEvent.bind(this)}>

        {this.props.ivevent.name} || 
        {this.props.ivevent.date.toString()}


      </div>
    )
  }
}
