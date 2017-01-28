import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class Text extends TrackerReact(React.Component) {
	constructor(props) {
    super(props);

    this.state = {
			title: props.title,
			required: props.req
		};
  }



	render() {
		let title = this.state.title;
		let req = this.state.req;
		let i = this.props.i;
		return (
			<div>
				<div className="input-field col s12">
					<input type="text" id={i+"title"} ref="title"/>
					<label htmlFor={i+"title"}>{title}</label>
				</div>
				<div className="input-field col s12">

				</div>
			</div>

		)
	}
}
