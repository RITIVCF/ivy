import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';


export default class InfoBarMain extends TrackerReact(React.Component) {
	constructor(){
		super();

	}



	render() {

		return (
			<main className={Session.get("infobar")?"sidenav-padding-right":""} style={{paddingLeft: "200px", paddingTop: "10px",height:"100vh"}}>
				{this.props.content}
			</main>
		)
	}
}
