import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class TextInput extends TrackerReact(React.Component) {
  constructor(props){
    super(props);

		this.state = {
			value: props.value ? props.value : this.getDefaultValue()
		};

		this.handleChange = this.handleChange.bind(this);
  }

	componentDidMount(){
		Materialize.updateTextFields();
	}

	componentDidUpdate(){
		Materialize.updateTextFields();
	}

	handleChange(event){
		this.props.onChange(event.target.value);
		this.setState({value: event.target.value});
		this.value = event.target.value;
	}

	getTextFieldId(){
		return this.props.id + "_textinput";
	}

	getClassName(){
		return "col s12";
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
		const value = this.state.value;
		let className = this.getClassName();
		const childProps = {
			id: id,
			type: "text",
			className: this.props.multi&&"materialize-textarea",
			value: value,
			defaultValue: defaultValue,
			onChange: this.handleChange
		}
    return (
			<Row>
				<div className="input-field col s12">
					{
						this.props.multi ?
							<textarea {...childProps} />
						:
						<input {...childProps} />
					}
					<label htmlFor={id}>{label}</label>
				</div>
			</Row>
    )
  }

}
