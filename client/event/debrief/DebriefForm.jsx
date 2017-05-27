import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Rating from './Rating.jsx';
import Debrief from '../../../lib/classes/Debrief.js';

export default class DebriefForm extends TrackerReact(React.Component) {
	constructor(props) {
    super(props);

		this.state = {
		//	debrief: new Debrief(props.eid)
		};

  }

  componentWillUnmount(){
  }


	save(){
		this.state.debrief.saveDraft();
	}

	submit(event){
		event.preventDefault();
		this.state.debrief.submit();
	}

	componentDidMount(){

	}


	render() {
		let debrief = new Debrief(this.props.eid);
		if(!debrief){
			return false;
		}
		return (
      <div className="row">
        <form onSubmit={this.submit.bind(this)}>
					{debrief._id}
					<div className="col s12">
						<button className="btn" >Submit</button>
					</div>
				</form>
      </div>
		)
	}
}
