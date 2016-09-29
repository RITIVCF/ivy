import React, {Component} from 'react';

export default class EventSingle extends Component {

  go(){
      FlowRouter.go("/attendance/event/"+this.props.ivevent._id)
  }

  render() {
    // This area needs styled, so however we need to do it to style
    // it correctly. Review Alex's mock ups and Jeanie's drawings.-->

    return (
      <div className="row">
        <div className={this.props.sidebar ? "col-md-12":"col-md-8"}>
        <div className="panel panel-default" onClick={this.go.bind(this)}>
          <div className="panel-body">
            <h3>{this.props.ivevent.name}</h3>
            {this.props.ivevent.start instanceof Date ? <div>{new moment(this.props.ivevent.start.toISOString()).format("ddd Do MMM YY")}<br/></div>: ""}
            {this.props.ivevent.start instanceof Date ? new moment(this.props.ivevent.start.toISOString()).format("h:mmA"): ""}
          </div>
        </div>
      </div>
    </div>
    )
  }
}
