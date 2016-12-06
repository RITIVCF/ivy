import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';


export default class Migration extends TrackerReact(React.Component) {
	constructor(){
		super();

	}



	merge(){
		Meteor.call("migrateDatabase");
		//Meteor.call("testCreation");
	}

	render() {
		return (
					<a className="waves-effect waves-light btn" onClick={this.merge.bind(this)}>Perform Migration</a>
		)
	}
}
