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
		return (

			<div className={this.props.show?"info-box":"info-box infohide"} onClick={this.stopit.bind(this)}>
				<div className="col s12">
					{this.props.content}
				</div>
			</div>


		)
	}
}
