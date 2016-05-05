import React, {Component} from 'react';

export default class EventSingle extends Component {
  openEvent(event){
    event.preventDefault();
    // opens event in event workspace

  }
  render() {
    // This area needs styled, so however we need to do it to style
    // it correctly. Review Alex's mock ups and Jeanie's drawings.-->

    return (
      <div onClick={this.openEvent.bind(this)}>
        <div>{/*Picture goes here*/}</div>
        <div><p>{this.props.ivevent.name}</p></div>
        <div><p>{this.props.ivevent.description}</p></div>
        <div><p>{this.props.ivevent.start.toDateString()}</p></div>
      </div>
    )
  }
}
