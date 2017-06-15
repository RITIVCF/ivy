import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class TextInput extends TrackerReact(React.Component) {
  constructor(props){
    super(props);

		this.handleChange = this.handleChange.bind(this);
  }

	handleChange(event){
		this.props.onChange(event.target.value);
	}

	getTextFieldId(){
		return this.props.id + "_textinput";
	}

	getClassName(){
		return "";
	}

	getDefaultValue(){
		if(this.props.defaultValue === false){
			return "";
		}
		else{
			return this.props.defaultValue;
		}
	}

	render() {
		let id = this.getTextFieldId();
		let label = this.props.label;
		let defaultValue = this.getDefaultValue();
		let value = this.props.value;
		let className = this.getClassName();
    return (
			<div className="input-field">
				<input id={id}
					type="text"
					className={className}
					value={value}
					defaultValue={defaultValue}
					onChange={this.handleChange} />
				<label htmlFor={id}>{label}</label>
			</div>
    )
  }

}
