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
		<div className="container-fluid">
			<div className="row">
				<div className="col-sm-3 col-lg-2">
					<nav className="navbar navbar-default navbar-fixed-side">

					</nav>
				</div>
				<div className="col-sm-9 col-lg-10">
					<h1>Site Settings Dashboard</h1>
					{this.getOptions().map( (option) => {
						return <Option option={option} />
					})}
				</div>
			</div>
		</div>
		)
	}
}
