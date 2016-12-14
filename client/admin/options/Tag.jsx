import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';


export default class Tag extends TrackerReact(React.Component) {
	constructor(){
		super();

	}

	removeTag(event){
    event.stopPropagation();
		if(window.confirm("Are you sure?")){
				Meteor.call("deleteEventTag", this.props.tag);
		}
  }

	componentDidMount(){

	}




	render() {
		return (
			<li className="collection-item">
				<div>
				{/*}	<i className="material-icons" onClick={this.removeTag.bind(this)}>close</i>*/}
					{this.props.tag}
					<a className="secondary-content">
					<i className="material-icons">stop</i>
					</a>
				</div>
			</li>

		)
	}
}
