import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class EventItem extends TrackerReact(React.Component) {
	constructor(){
		super();

	}


go(){
	FlowRouter.go("/tickets/"+this.props.t._id)
}


	render() {


		return (<li onClick={this.go.bind(this)} className="collection-item">
      <span className="title">{this.props.t.subject}</span>
      <p>{this.props.t.status} <br />
			Last Updated: {new moment(this.props.t.lastUpdated.toISOString()).format("DD MMM @ h:mmA")}
      </p>

    </li>

		)
	}
}
