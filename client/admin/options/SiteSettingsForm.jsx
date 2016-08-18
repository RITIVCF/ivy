import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Option from './Option.jsx';


export default class SiteSettingsForm extends TrackerReact(React.Component) {
	constructor(){
		super();

	}

	getOptions(){
		return Options.find({_id:{$ne:"ticketstatuses"}}).fetch();
	}

	render() {
		return (
		<div>
			<h1>Site Settings Dashboard</h1>
			{this.getOptions().map( (option) => {
				return <Option option={option} />
			})}
		</div>
		)
	}
}
