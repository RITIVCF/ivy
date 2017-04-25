import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';


export default class InfoBarMobile extends TrackerReact(React.Component) {
	constructor(){
		super();
		// if(!Session.get("infobar")){
		// 	Session.set("infobar",true);
		// }
	}

  componentDidMount() {
    $('#fake-button').sideNav({
      menuWidth: 240, // Default is 300
      edge: 'right', // Choose the horizontal origin
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });
    $('#info-bar-mobile').appendTo('body');
  }

  componentWillUnmount(){
    $('#fake-button').sideNav("destroy");
  }

	stopit(event){
		event.stopPropagation();
	}

	render() {
		return (
      <div>
        <a id="fake-button" data-activates="info-bar-mobile">.</a>
  			<ul id="info-bar-mobile" className="side-nav right">
  				{this.props.content}
  			</ul>
      </div>
		)
	}
}
