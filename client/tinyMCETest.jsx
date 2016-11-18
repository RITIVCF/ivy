import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import tiny from 'tinymce/tinymce';
//require('../node_modules/tinymce/tinymce.min.js');


export default class tinyMCETest extends TrackerReact(React.Component) {
	constructor(){
		super();
		console.log("tinyMCETest is contructing");
		this.state = {

		}
	}

	componentDidMount(){
		console.log("did mount");
		console.log(tinymce);
		tinymce.init({
    	selector: '#mytextarea'
  	});
	}

	render() {

		return (
			<div className="card" style={{width: "100&"}}>
				<textarea id="mytextarea">
				</textarea>
			</div>
		)
	}
}
