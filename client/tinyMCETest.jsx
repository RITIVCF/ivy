import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';


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
			selector: "#mytextarea",
      theme: "modern",
      height: 300,
			plugins: "table link textcolor colorpicker autolink fullscreen paste contextmenu hr searchreplace",
			elementpath: false,
			menubar: "edit insert view format table"
  	});
  }

	render() {

		return (
			<div className="card" style={{width: "100&"}}>
				<form method="post">
          <textarea id="mytextarea">
  				</textarea>
        </form>
			</div>
		)
	}
}
