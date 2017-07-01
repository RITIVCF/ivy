import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import MaterialCollectionItem from './MaterialCollectionItem.jsx';

export default class MaterialCollection extends TrackerReact(React.Component) {
  constructor(){
    super();

		this.handleSelect = this.handleSelect.bind(this);
  }

	handleSelect(i){
		this.props.onSelect(i);
	}

	render(){
		let values = this.props.values;
		let selectedIndex = this.props.selectedIndex;
		let icon = this.props.icon;
		let action = this.props.action;
		return (
			<div className="collection">
				{values.map( (value, i) => {
					return <MaterialCollectionItem
						key={i}
						i={i}
						isSelected={selectedIndex===i}
						value={value}
						icon={icon}
						action={action}
						onSelect={() => {this.handleSelect(i)}}
						/>
				})}
			</div>
		)
	}
}
