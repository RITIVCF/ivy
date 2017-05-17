import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import NoPerm from '../../NoPerm.jsx';
import LoaderCircle from '../../LoaderCircle.jsx';

export default class Debrief extends TrackerReact(React.Component) {
	constructor(props) {
    super(props);

    this.state = {

		};
  }

	openModal(){

	}

	componentWillUnmount(){

	}

	componentWillUpdate(nextProps){

	}

	save(){

	}

	submit(){

	}

	render() {
		let ev = this.props.ev;
		return (
			<div className="card">
				<div className="card-content">
					<span className="card-title">{ev.name}</span>
					<div className="row">
						<div className="col s12">

						</div>
					</div>
					<div className="row">
						<div className="col s12">
							{!edit&&<a className="btn" onClick={this.edit.bind(this)}>Edit</a>}
							{edit&&<a className="btn" style={{marginRight:"5px"}} onClick={this.save.bind(this)}>Save</a>}
							{edit&&<a className="btn" onClick={this.cancel.bind(this)}>Cancel</a>}
						</div>
					</div>
				</div>
			</div>
		)
	}
}
