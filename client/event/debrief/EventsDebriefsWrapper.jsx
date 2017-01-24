import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import NoPerm from '../../NoPerm.jsx';
import LoaderCircle from '../../LoaderCircle.jsx';
import MainBox from '../../MainBox.jsx';
import DebriefSummary from './DebriefSummary.jsx';

export default class EventDebriefsWrapper extends TrackerReact(React.Component) {
	constructor() {
    super();

    this.state = {
			num: 10,
      subscription: {
				drafts: Meteor.subscribe("myDebriefDrafts"),
				needDebrief: Meteor.subscribe("needDebrief"),
       debriefs: Meteor.subscribe("debriefs", 10)
      }
		};
  }

	componentWillUnmount() {
		this.state.subscription.drafts.stop();
		this.state.subscription.needDebrief.stop();
    this.state.subscription.debriefs.stop();
  }

	seeMore(){
		let num = this.state.num;
		this.setState({num: num+10});
		this.setState({debriefs: Meteor.subscribe("debriefs", num+10)});
	}


	render() {
		if(!(this.state.subscription.drafts.ready()&&this.state.subscription.debriefs.ready()&&this.state.subscription.needDebrief.ready())){
			return <LoaderCircle />
		}
		if(!checkPermission("events")){
			return <NoPerm />
		}
		return (
			<MainBox
        content={<div className="row">
            <div className="col s12">
							<DebriefSummary />
						</div>
          </div>}
        subheader={<ul/>}
        showinfobar={Meteor.user().preferences.debriefs_infobar}
        infobar={<div/>}
        />
		)
	}
}
