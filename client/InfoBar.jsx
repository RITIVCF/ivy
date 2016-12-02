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
			<ul id="infobar" onClick={this.stopit.bind(this)} className="side-nav right-aligned fixed z-depth-3" >
				<div className="col s12">
					{this.props.content}
				</div>
			</ul>

		)
	}
}
