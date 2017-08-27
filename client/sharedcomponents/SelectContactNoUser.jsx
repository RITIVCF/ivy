import Autosuggest from 'react-autosuggest';
import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';



function getList(){
  return Contacts.find({user: {$ne: true}}).fetch();
}

function getSuggestions(value) {
  //users: true, find Users
  //       fasle, use contacts
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

    return inputLength === 0 ? [] : getList().filter(contact =>
      contact.name.toLowerCase().slice(0, inputLength) === inputValue
    );


}

function getSuggestionValue(suggestion) { // when suggestion selected, this function tells
  return suggestion.name;                 // what should be the value of the input
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name} {suggestion.email}</span>
  );
}

function shouldRenderSuggestions(value) {
  return value.trim().length > 1;
}


export default class SelectContactNoUser extends TrackerReact(React.Component) {
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
    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
  }

shouldComponentUpdate(nextProps, nextState){
  if(this.state.value=nextState.value){
    this.state.value=nextProps.initialValue;
  }
  return true;
}

  onSuggestionSelected(event, { suggestion, suggestionValue, sectionIndex, method }){
    suggestion.component = this;
    this.props.updateContact(suggestion);
  }


  onChange(event, { newValue, method }) {
    if(method != 'tab'){
      this.props.unset();
    }
    const value = event.target.value;

    if(typeof newValue !== 'undefined') {
        this.setState({
            value: newValue
        });
    }
  }

  onSuggestionsFetchRequested({ value }){
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested(){
    // Autosuggest will call this function every time you need to clear suggestions.
    this.setState({
      suggestions: []
    });
  };

  onSuggestionsUpdateRequested({ value }) {

    this.setState({
      suggestions: getSuggestions(value)
    });
  }

  render() {

    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Name',
      value,
      onChange: this.onChange
    };
    if(this.props.id){
      return (
        <Autosuggest id={this.props.id}
					suggestions={suggestions}
					onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
					getSuggestionValue={getSuggestionValue}
					onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
					onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
					onSuggestionSelected={this.onSuggestionSelected.bind(this)}
					focusInputOnSuggestionClick={false}
					shouldRenderSuggestions={shouldRenderSuggestions}
					renderSuggestion={renderSuggestion}
					inputProps={inputProps} />
      );
    }
    else{
      return (
        <Autosuggest suggestions={suggestions}
					onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
					getSuggestionValue={getSuggestionValue}
					onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
					onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
					onSuggestionSelected={this.onSuggestionSelected.bind(this)}
					focusInputOnSuggestionClick={false}
					shouldRenderSuggestions={shouldRenderSuggestions}
					renderSuggestion={renderSuggestion}
					inputProps={inputProps} />
      );
    }

  }
}
