import Autosuggest from 'react-autosuggest';
import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class AutoComplete extends React.Component {
  constructor(props) {
    super(props);

      this.state = {
        disabled: false,
        value: '',
        suggestions: getSuggestions('')
      };
    if(props.initialValue){
      this.state.value = props.initialValue;
    }

    this.onChange = this.onChange.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
  }

shouldComponentUpdate(nextProps, nextState){
  if(this.state.value=nextState.value){
      this.state.value=nextProps.initialValue;
  }
  return true;
}

  onSuggestionSelected(event, { suggestion, suggestionValue, sectionIndex, method }){
    // I need to do something with suggestion. This holds the contact info.
    suggestion.component = this;
    this.props.onSuggestionSelected(suggestion);
    if(!this.props.unset){
        this.setState({value: ''});
    }
    else{
      this.setState({value: suggestion.name});
    }
  }


  onChange(event, { newValue, method }) {
    if(method != 'tab'){
      if(this.props.unset){
        this.props.unset();
      }
    }
    const value = event.target.value;

    this.setState({
      value: newValue
    });

  }

  onBlur(){
    Materialize.updateTextFields();
  }


  onSuggestionsFetchRequested({ value }) {
		console.log("Value: ", value);
    this.setState({
      suggestions: getSuggestions(this.props.find, value)
    });
  }

  onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    });
  }

  focus(){
    // Brings focus to this control
    document.getElementById(this.props.id).focus();
  }

  render() {
		console.log("renderSuggestion: ", this.props.renderSuggestion);
    const { value, suggestions } = this.state;
    const inputProps = {
      label: this.props.label?this.props.label:"Name",
      value,
      disabled: this.state.disabled,
      onChange: this.onChange,
      className:"autocomplete-content dropdown-content",
      onBlur: this.onBlur,
      id: this.props.id
    };
      return (
        <Autosuggest id={this.props.id}
					suggestions={suggestions}
					getSuggestionValue={getSuggestionValue}
					focusFirstSuggestion={false}
					onSuggestionSelected={this.onSuggestionSelected.bind(this)}
					focusInputOnSuggestionClick={false}
					shouldRenderSuggestions={shouldRenderSuggestions}
					renderSuggestion={renderSuggestion}
					inputProps={inputProps}
					renderInputComponent={inputComponent}
					onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
					onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
				/>
      );

  }
}


const getSuggestions = (find, value) => {
	console.log("Collection: ", find);
	if(!value){
		value = "";
	}
	return Events.find({name: { $regex : value, $options : 'i'}}).fetch();
}

const getSuggestionValue = suggestion => { // when suggestion selected, this function tells
  return suggestion.name;                 // what should be the value of the input
}

const renderSuggestion = suggestion => {
  return (
      <span>{suggestion.name}
        <span
					style={{float: "right"}}>
					{new moment(suggestion.start.toISOString()).format("ddd MMM Do")}
				</span>
      </span>

  );
}

const shouldRenderSuggestions = value => {
  return value.trim().length > 1;
}

const inputComponent = inputProps => {
  return <div className="input-field select-dropdown">
    <input {...inputProps} required />
    <label htmlFor={inputProps.id}>{inputProps.label}</label>
  </div>
}
