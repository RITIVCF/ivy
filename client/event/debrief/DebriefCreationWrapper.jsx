import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import LoaderCircle from '../../LoaderCircle.jsx';
import NoPerm from '../../NoPerm.jsx';
import MainBox from '../../MainBox.jsx';

import DebriefCreationForm from './DebriefCreationForm';
import DebriefInfoBar from './DebriefInfoBar.jsx';

export default class DebriefCreationWrapper extends TrackerReact(React.Component) {
	constructor(props) {
    super(props);
		document.title="Ivy - Debrief Questions";

    this.state = {
			subscription: {
				DebriefQuestions: Meteor.subscribe("allDebriefQuestions")
			}
    };
  }

  componentWillUnmount(){
		this.state.subscription.DebriefQuestions.stop();
  }

	componentDidMount(){

	}

	render() {
		if(!this.state.subscription.DebriefQuestions.ready()){
			return <LoaderCircle />
		}

		if(!checkPermission("admin")){
			return <NoPerm />
		}

		return (
			<MainBox
        content={<DebriefCreationForm />}
        subheader={<ul></ul>}
        showinfobar={true}
        infobar={
					<DebriefInfoBar qid={Session.get("selectedQuestion")} />
				}
        />
		)
	}
}
