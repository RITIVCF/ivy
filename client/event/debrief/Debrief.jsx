import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import NoPerm from '../../NoPerm.jsx';
import LoaderCircle from '../../LoaderCircle.jsx';
import Response from './Response.jsx';

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
							{ev.debrief.questions.map((response, i)=>{
								return <Response key={i} response={response} />
							})}
						</div>
					</div>
					<div className="row">
						<div className="col s12">
							<a className="btn" >Edit</a>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
