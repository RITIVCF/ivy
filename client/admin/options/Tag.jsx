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
					{this.props.tag.tag}
					<a className="secondary-content">
						<i className="material-icons" style={{"color": this.props.tag.color}}>stop</i>
					</a>
				</div>
			</li>

		)
	}
}
