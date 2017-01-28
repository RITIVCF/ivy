import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import LoaderCircle from '../../LoaderCircle.jsx';
import NoPerm from '../../NoPerm.jsx';

import DebriefCreationForm from './DebriefCreationForm';

export default class DebriefCreationWrapper extends TrackerReact(React.Component) {
	constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentWillUnmount(){

  }

	componentDidMount(){

	}

	render() {
		if(!Options.findOne("debriefquestions")){
			return <LoaderCircle />
		}
		if(!checkPermission("admin")){
			return <NoPerm />
		}
		return (
			<div className="container">
				<div className="card">
					<div className="card-content">
						<DebriefCreationForm />
					</div>
				</div>
			</div>
		)
	}
}
