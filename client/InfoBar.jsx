import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';


export default class InfoBar extends TrackerReact(React.Component) {
	constructor(){
		super();
		// if(!Session.get("infobar")){
		// 	Session.set("infobar",true);
		// }
	}

	stopit(event){
		event.stopPropagation();
	}

	render() {
		if(!Session.get("infobar")){
			return <div></div>
		}
		return (

			<div className="info-box" onClick={this.stopit.bind(this)}>
				<div className="col s12">
					{this.props.content}
				</div>
			</div>
			

		)
	}
}
