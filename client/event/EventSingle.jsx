import React, {Component} from 'react';
import ButtonPublish from './components/ButtonPublish.jsx';

export default class EventSingle extends Component {

  render() {
    // This area needs styled, so however we need to do it to style
    // it correctly. Review Alex's mock ups and Jeanie's drawings.-->

    return (
      <div className="panel">
        {this.props.ivevent.owner == Meteor.userId() ?
        <a href={"/events/workspace/" + this.props.ivevent._id}>
          <div>{/*Picture goes here*/}</div>
          <div>{this.props.ivevent.name}</div>
          <div>{this.props.ivevent.description}</div>
          <div>{this.props.ivevent.start instanceof Date ? this.props.ivevent.start.toDateString(): ""}</div>
          <div>{this.props.ivevent.start instanceof Date ? this.props.ivevent.start.toLocaleTimeString(): ""}</div>
        </a>
        :
        <div>
          <div>{this.props.ivevent.name}</div>
          <div>{this.props.ivevent.description}</div>
          <div>{this.props.ivevent.start instanceof Date ? this.props.ivevent.start.toDateString(): ""}</div>
          <div>{this.props.ivevent.start instanceof Date ? this.props.ivevent.start.toLocaleTimeString(): ""}</div>
        </div>
      }
        {this.props.showPubBtn ?
        <ButtonPublish published={this.props.ivevent.published} eid={this.props.ivevent._id} /> : "" }
      </div>

    )
  }
}
