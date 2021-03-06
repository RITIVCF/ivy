import React, {Component} from 'react';
import ButtonPublish from './components/ButtonPublish.jsx';

export default class EventSingle extends Component {

  go(){
    FlowRouter.go("/events/workspace/"+this.props.ivevent._id);
  }

  render() {
    // This area needs styled, so however we need to do it to style
    // it correctly. Review Alex's mock ups and Jeanie's drawings.-->

    return (
      <div onClick={this.go.bind(this)} className={this.props.ivevent.published?"panel panel-success":"panel panel-danger"} >
      {/*}  {this.props.ivevent.owner == Meteor.userId() ? */}
          <div className="panel-heading" >
            {this.props.ivevent.name}
          </div>
          <div className="panel-body">
              <div>{/*Picture goes here*/}</div>
              <div>{this.props.ivevent.description}</div>
              <div>{this.props.ivevent.start instanceof Date ? this.props.ivevent.start.toDateString(): ""}</div>
              <div>{this.props.ivevent.start instanceof Date ? moment(this.props.ivevent.start).format("h:mm a"): ""}</div>
            {this.props.showPubBtn  ?
            <ButtonPublish published={this.props.ivevent.published} eid={this.props.ivevent._id} /> : "" }
          </div>
        {/*}:
        <div>
          <div>{this.props.ivevent.name}</div>
          <div>{this.props.ivevent.description}</div>
          <div>{this.props.ivevent.start instanceof Date ? this.props.ivevent.start.toDateString(): ""}</div>
          <div>{this.props.ivevent.start instanceof Date ? moment(this.props.ivevent.start).format("h:mm a"): ""}</div>
        </div>
      */}
      </div>

    )
  }
}
