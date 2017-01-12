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


		return (<li onDoubleClick={this.go.bind(this)} className="collection-item" id="showhim">
      <span className="title">{this.props.t.subject}</span>
      <p>{this.props.t.status}
				<a id="showme" className="btn right valign"
					onClick={this.go.bind(this)}>Open</a>
				<br />
			Last Updated: {new moment(this.props.t.lastUpdated.toISOString()).format("DD MMM @ h:mmA")}
      </p>

    </li>

		)
	}
}
