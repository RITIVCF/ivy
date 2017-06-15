import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class DropdownButtonItem extends TrackerReact(React.Component) {
  constructor(){
    super();

		this.handleClick = this.handleClick.bind(this);
  }

	handleClick(){
		if(!!this.props.option.action){
			this.props.option.action(this.props.option.arg);
		}
		if(!!this.props.action){
			this.props.action(this.props.option.arg);
		}
	}

	render(){
		let option = this.props.option;
		let text = option.text;
		let icon = option.icon;
		let type = option.type;
		if(type == "divider"){
			return <li className="divider"></li>
		}
		return (<li>
			<a onClick={this.handleClick}>
				{!!icon && <MaterialIcon icon={icon} />}
				{text}
			</a>
		</li>
		)
	}
}
