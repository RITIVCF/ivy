import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import MaterialIcon from '/client/sharedcomponents/MaterialIcon.jsx';

export default class MaterialCollectionItem extends TrackerReact(React.Component) {
  constructor(){
    super();

		this.select = this.select.bind(this);
  }

	getClassName(){
		let className = "collection-item";
		if(this.props.isSelected){
			className += " active";
		}
		return className;
	}

	select(){
		this.props.onSelect();
	}

	render(){
		let className = this.getClassName();
		let value = this.props.value;
		let icon = this.props.icon;
		let action = this.props.action;
		return (
			<a className={className} onClick={this.select}>
				<MaterialIcon icon={icon} action={() => {action(this)}} />
				{value}
			</a>
		)
	}
}
