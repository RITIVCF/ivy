import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';


export default class Footer extends TrackerReact(React.Component) {
	constructor(){
		super();

		this.state = {
			subscription: {

			}
		}


	}

	componentDidMount(){

	}

	componentDidUpdate(){

	}

	render(){
		return(
			<footer className="page-footer">
				<div className="footer-copyright">
	        <div className="container">
	        &nbsp;{"Ivy v1.0.4"}{/*find way of doing version number with settings or something here*/}
	        <a className="grey-text text-lighten-4 right" target="_blank" href="http://ivcf.rit.edu">ivcf.rit.edu</a>
	        </div>
	      </div>
				{/*}<div className="container">
		      <div className="row">
		        <div className="col s12">
		          <h5 className="white-text">Footer Content</h5>
		          <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
		        </div>
		        <div className="col l4 offset-l2 s12">
		          <h5 className="white-text">Links</h5>
		          <ul>
		            <li><a className="grey-text text-lighten-3" href="#!">Link 1</a></li>
		            <li><a className="grey-text text-lighten-3" href="#!">Link 2</a></li>
		            <li><a className="grey-text text-lighten-3" href="#!">Link 3</a></li>
		            <li><a className="grey-text text-lighten-3" href="#!">Link 4</a></li>
		          </ul>
		        </div>
		      </div>
	      </div>
	      <div className="footer-copyright">
	        <div className="container">
	        © 2014 Copyright Text
	        <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
	        </div>
	      </div>*/}
			</footer>
		)
	}
}
