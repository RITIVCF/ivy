import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import RequestWrapper from '../request/RequestWrapper.jsx';
import EventName from './components/EventName.jsx';
import EventDescription from './components/EventDescription.jsx';
import EventWorkpad	from './components/EventWorkpad.jsx';
import InfoBar from '../InfoBar.jsx';
import WorkspacePanel from './WorkspacePanel.jsx';

//export default class EventWorkspace extends TrackerReact(React.Component) {
export default class EventWorkspace extends React.Component {
	constructor(props) {
    super(props);

  }

  componentWillUnmount() {

  }



	// openReoccuring(event){
	// 	event.preventDefault();
	// 	this.refs.reoccuringOverlay.openOverlay();
	// }


	render() {
		let ev = this.props.ev;
		let perm = this.props.perm;
		const imgPath = ev.pic ? ev.pic : "/images/defaultEventSmall.png";
		return (
				<div className="row" style={{height: "100%"}}>
					<div className="col s12">
						<div className="card">
							<div className="eventImage" style={{backgroundImage: `url(${imgPath})`}}>
								<EventName ev={ev} perm={perm} />
							</div>
							<div className="card-content">
								<EventDescription ev={ev} perm={perm} />
								<EventWorkpad ev={ev} perm={perm} />
							</div>
						</div>
						<RequestWrapper eid={ev._id} parent={this} perm={perm} />
					</div>
				</div>
		)
	}
}
