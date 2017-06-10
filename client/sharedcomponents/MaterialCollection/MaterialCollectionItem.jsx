import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class MaterialCollectionItem extends React.Component {
  constructor(){
    super();

  }

	getClassName(){
		let className = "collection-item";
		if(this.props.isSelected){
			className += " active";
		}
		return className;
	}

	render(){
		let className = this.getClassName();
		let value = this.props.value;
		return (
			<a className={className}>{value}</a>
		)
	}
}
