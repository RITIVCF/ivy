import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class EventItem extends TrackerReact(React.Component) {
	constructor(){
		super();

	}





	render() {


		return (<li className="collection-item avatar">
      <img src="images/defaultEventSmall.png" alt="" className="circle"/>
      <span className="title">{this.props.event.name}</span>
      <p>{this.props.event.location}
				{this.props.rsvp?
					<a className="right waves-effect waves-light btn green">RSVP</a>:""}
				<br/>
         {new moment(this.props.event.start.toISOString()).format("DD MMM @ h:mmA")}
      </p>

    </li>

		)
	}
}
