import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import NoPerm from '../../NoPerm.jsx';
import LoaderCircle from '../../LoaderCircle.jsx';
import DebriefModal from './DebriefModal.jsx';

export default class Debrief extends TrackerReact(React.Component) {
	constructor(props) {
    super(props);

    this.state = {

		};
  }

	openModal(){
		this.refs.modal.open();
	}

	render() {
		let ev = this.props.ev;
		return (
			<div className="card">
				<div className="card-content">
					<span className="card-title">{ev.name}</span>
					<p>{moment(ev.start.toISOString()).format("DDDD MMM YYYY")}
						<a className="btn right" onClick={this.openModal.bind(this)}>Edit</a>
					</p>
				</div>
				<DebriefModal ref="modal" ev={ev} />
			</div>
		)
	}
}
