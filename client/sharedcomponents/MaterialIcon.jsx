	import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class MaterialIcon extends TrackerReact(React.Component) {
  constructor(){
    super();

		this.onClick = this.onClick.bind(this);

  }

	onClick(event){
		if(!!this.props.action){
			event.stopPropagation();
			// this.props.icon.action(this.props.icon.arg);
			console.log("The icon is about to execute the action.");
			this.props.action();
		}
	}

	getStyle(){
		let style = !!this.props.action ?
			{
				cursor: "pointer",
				float: "left",
				margin: "0 24px 0 0",
				width: "24px"
			}
			:{};
		return style;
	}

	render(){
	 	let icon = this.props.icon;
		let action = this.props.action;
		let style = this.getStyle();
		return (
			<i
				onClick={this.onClick}
				style={style}
				className="material-icons">
				{icon}
			</i>
		)
	}
}
