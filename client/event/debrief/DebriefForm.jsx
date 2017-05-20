import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Rating from './Rating.jsx';

export default class DebriefForm extends TrackerReact(React.Component) {
	constructor(props) {
    super(props);
		var debriefs = Debriefs.find({eid: props.ev._id, uid: Meteor.userId()}).fetch();
		if(debriefs.length==1){
			var debrief = debriefs[0];
			this.state = {
				notes: debrief.notes
			};
		}
		else{

		}
    console.log(this.state.notes);

  }

  componentWillUnmount(){
  }


	save(){

	}

	submit(event){
		event.preventDefault();

	}

	componentDidMount(){

	}


	render() {
		return (
      <div className="row">
        <form onSubmit={this.submit.bind(this)}>

					<div className="col s12">
						<button className="btn" >Submit</button>
					</div>
				</form>
      </div>
		)
	}
}
