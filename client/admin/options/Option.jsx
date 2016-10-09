import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class Option extends TrackerReact(React.Component) {
	constructor(){
		super();

	}




	render() {
		return (
		<div>
			<h1>{this.props.option._id}</h1>
			{!this.props.option.vals ? <p>Value: {this.props.option.val}</p>:
				this.props.option.vals.map((value)=>{
					return <div>{value}</div>
			})
		}
		</div>
		)
	}
}
