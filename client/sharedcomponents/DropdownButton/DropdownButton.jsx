import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import DropdownButtonItem from './DropdownButtonItem.jsx';
import MaterialIcon from '/client/sharedcomponents/MaterialIcon.jsx';

export default class DropdownButton extends TrackerReact(React.Component) {
  constructor(){
    super();

		this.getButtonId = this.getButtonId.bind(this);
  }

	getButtonId(){
		return this.props.id+"_button";
	}

	componentDidMount(){
		let hover = false;
		if(!!this.props.hover){
			hover = this.props.hover;
		}
		$('#'+this.getButtonId()).dropdown({
      hover: hover, // Activate on hover
			constrain_width: false, // fit items, not to button size
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'right', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    }
  );
	}

	render(){
		let id = this.props.id;
		let text = this.props.text;
		let icon = this.props.icon;
		let action = this.props.action;
		let options = this.props.options;
		return <span>
			<a id={this.getButtonId()} className="dropdown-button btn btn-flat" data-activates={id}>{!!text?text:<MaterialIcon icon={icon}/>}</a>
			<ul id={id} className='dropdown-content'>
				{options.map( (option, i) => {
					return <DropdownButtonItem key={i} option={option} action={action} />
				})}
			</ul>
		</span>
	}
}
