import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import NoPerm from '/client/NoPerm.jsx';
import LoaderCircle from '/client/LoaderCircle.jsx';
import MainBox from '/client/MainBox.jsx';
import DebriefSummary from './DebriefSummary.jsx';

export default class EventDebriefsWrapper extends TrackerReact(React.Component) {
	constructor() {
    super();

    this.state = {
			num: 10,
      subscription: {
				needDebrief: Meteor.subscribe("debrief.listing"),
      }
		};

		this.goToEditQuestions = this.goToEditQuestions.bind(this);
  }

	componentWillUnmount() {
		this.state.subscription.needDebrief.stop();
  }

	componentDidUpdate(){
		$('.tooltipped').tooltip({delay: 50});
	}

	goToEditQuestions(){
		routeTo("editdebriefquestions");
	}

	seeMore(){
		let num = this.state.num;
		this.setState({num: num+10});
		this.setState({debriefs: Meteor.subscribe("debriefs", num+10)});
	}

	getSubheader(){
		return (
			<ul>
				{checkPermission("admin")&&
					<li>
						<a onClick={this.goToEditQuestions} className="tooltipped" data-position="bottom" data-delay="50" data-tooltip="Set Default Questions"><i className="material-icons black-text">edit</i></a>
				</li>}
			</ul>
		)
	}


	render() {
		if(	!this.state.subscription.needDebrief.ready() ) {
			return <LoaderCircle />
		}
		if(!checkPermission("events")){
			return <NoPerm />
		}
		return (
			<MainBox
        content={
					<div className="row">
						<div className="col s12">
							<DebriefSummary />
						</div>
					</div>
				}
        subheader={this.getSubheader()}
        showinfobar={Meteor.user().preferences.debriefs_infobar}
        infobar={<div/>}
			/>
		)
	}
}
