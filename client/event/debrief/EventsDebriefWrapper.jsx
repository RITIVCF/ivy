import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import NoPerm from '../../NoPerm.jsx';
import LoaderCircle from '../../LoaderCircle.jsx';
import Debrief from './Debrief.jsx';
import DebriefForm from './DebriefForm.jsx';

export default class EventDebriefWrapper extends TrackerReact(React.Component) {
	constructor(props) {
    super(props);

    this.state = {
      subscription: {
				drafts: Meteor.subscribe("myDebriefDrafts"),
       debrief: Meteor.subscribe("thisDebrief", props.eid)
      }
		};
  }

	componentWillUnmount() {
		this.state.subscription.drafts.stop();
    this.state.subscription.debrief.stop();
  }

	Event(){
		return Events.findOne(this.props.eid);
	}

	render() {
		if(!(this.state.subscription.drafts.ready()&&this.state.subscription.debrief.ready())){
			return <LoaderCircle />
		}
		if(!checkPermission("events")){
			return <NoPerm />
		}
		let ev = this.Event();
		if(!ev.debrief){
			return(
				<div className="card">
					<div className="card-content">
						<DebriefForm ev={ev} />
					</div>
				</div>
			)
		}
		return (
			<Debrief ev={ev} />
		)
	}
}
