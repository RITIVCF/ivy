import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';


export default class SubHeader extends TrackerReact(React.Component) {
	constructor(){
		super();


	}
	render(){
		return(
		<nav className="subheader z-depth-1">
			<div className="nav-wrapper row">
				{this.props.content}
			</div>
		</nav>
		)

	}
}
