import Autosuggest from 'react-autosuggest';
import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';



function getList(){
  return Options.findOne("eventtags").vals;
}

function getSuggestions(value) {
  //users: true, find Users
  //       fasle, use contacts
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? getList() : getList().filter(tag =>
    tag.tag.toLowerCase().slice(0, inputLength) === inputValue
  );

}

function getSuggestionValue(suggestion) { // when suggestion selected, this function tells
  return suggestion.tag;                 // what should be the value of the input
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.tag}</span>
  );
}

function shouldRenderSuggestions(value) {
  return value.trim().length >= 0;
}


export default class SelectTag extends TrackerReact(React.Component) {
  constructor(props) {
    super(props);

      this.state = {
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
    this.props.onSelected(suggestion);
    if(!this.props.unset){
        this.setState({value: ''});
    }
    else{
      this.setState({value: suggestion.tag});
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


  onSuggestionsFetchRequested({ value }) {
    this.setState({
      suggestions: getSuggestions(value)
    });
  }

  onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    });
  }

  render() {

    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: '+Type',
      value,
      onChange: this.onChange
    };
    if(this.props.id){
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
					onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
					onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
				/>
      );
    }
    else{
      return (
        <Autosuggest suggestions={suggestions}
					getSuggestionValue={getSuggestionValue}
					focusFirstSuggestion={false}
					onSuggestionSelected={this.onSuggestionSelected.bind(this)}
					focusInputOnSuggestionClick={false}
					shouldRenderSuggestions={shouldRenderSuggestions}
					renderSuggestion={renderSuggestion}
					inputProps={inputProps}
					onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
					onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
				/>
      );
    }

  }
}
