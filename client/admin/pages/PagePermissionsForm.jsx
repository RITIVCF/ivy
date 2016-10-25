import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Page from './Page.jsx';

export default class PagePermissionsForm extends TrackerReact(React.Component) {
	constructor(){
		super();

	}

	getPages(){
		return PagePermissions.find().fetch();
	}

	render() {
		return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-sm-3 col-lg-2">
					<nav className="navbar navbar-default navbar-fixed-side">

					</nav>
				</div>
				<div className="col-sm-9 col-lg-10">
					<h1>Page Permissions</h1>
					{this.getPages().map( (page) => {
						return <Page page={page} />
					})}
				</div>
			</div>
		</div>
		)
	}
}
