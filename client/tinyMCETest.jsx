import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';



export default class tinyMCETest extends TrackerReact(React.Component) {
	constructor(){
		super();
		console.log("tinyMCETest is contructing");
		this.state = {

		}
	}

	throttletest(){
		console.log("running throttletest");
		_.throttle(
			function()
			{//console.log(value);
				//Meteor.call("updateEventWorkpad", eid, value);
				//Meteor.call("EventWorkpadLock", eid, true);
				console.debug(tinymce.activeEditor.getContent());
			},500);
	}


	componentWillUnmount(){
		tinymce.remove();
	}

	componentDidMount(){
		var thiz = this;
		console.log(this);
		console.log(thiz);
    console.log("did mount");
		console.log(tinymce);

  }



	render() {

		return (
			<div className="card" style={{width: "100&"}}>
				<form>

        </form>
			</div>
		)
	}
}
