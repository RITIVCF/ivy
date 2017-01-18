import Autosuggest from 'react-autosuggest';
import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';



function getTimes(){
    return [
      "4:00am",
      "4:15am",
      "4:30am",
      "4:45am",
      "5:00am",
      "5:15am",
      "5:30am",
      "5:45am",
      "6:00am",
      "6:15am",
      "6:30am",
      "6:45am",
      "7:00am",
      "7:15am",
      "7:30am",
      "7:45am",
      "8:00am",
      "8:15am",
      "8:30am",
      "8:45am",
      "9:00am",
      "9:15am",
      "9:30am",
      "9:45am",
      "10:00am",
      "10:15am",
      "10:30am",
      "10:45am",
      "11:00am",
      "11:15am",
      "11:30am",
      "11:45am",
      "12:00pm",
      "12:15pm",
      "12:30pm",
      "12:45pm",
      "1:00pm",
      "1:15pm",
      "1:30pm",
      "1:45pm",
      "2:00pm",
      "2:15pm",
      "2:30pm",
      "2:45pm",
      "3:00pm",
      "3:15pm",
      "3:30pm",
      "3:45pm",
      "4:00pm",
      "4:15pm",
      "4:30pm",
      "4:45pm",
      "5:00pm",
      "5:15pm",
      "5:30pm",
      "5:45pm",
      "6:00pm",
      "6:15pm",
      "6:30pm",
      "6:45pm",
      "7:00pm",
      "7:15pm",
      "7:30pm",
      "7:45pm",
      "8:00pm",
      "8:15pm",
      "8:30pm",
      "8:45pm",
      "9:00pm",
      "9:15pm",
      "9:30pm",
      "9:45pm",
      "10:00pm",
      "10:15pm",
      "10:30pm",
      "10:45pm",
      "11:00pm",
      "11:15pm",
      "11:30pm",
      "11:45pm",
      "12:00am"
    ];

}

function getSuggestions(value) {
  //users: true, find Users
  //       fasle, use contacts
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
    return inputLength === 0 ? [] : getTimes().filter(time =>
      time.toLowerCase().slice(0, inputLength) === inputValue
    );

}

function getSuggestionValue(suggestion) { // when suggestion selected, this function tells
  return suggestion;                 // what should be the value of the input
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion}</span>
  );
}

function shouldRenderSuggestions(value) {
  return value.trim().length > 0;
}





export default class SelectTime extends TrackerReact(React.Component) {
  constructor(props) {
    super(props);

      this.state = {
        value: '',
        suggestions: getSuggestions('')
      };

    if(this.props.initialValue){
      this.state.value = this.props.initialValue;
    }

    this.onChange = this.onChange.bind(this);
    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
  }



  onSuggestionSelected(event, { suggestion, suggestionValue, sectionIndex, method }){
    /*
    //console.log(suggestion);
    suggestion.component = this;
    this.props.updateTime(suggestion);
    */
  }


  onChange(event, { newValue, method }) {
    //console.log(method);
    /*if(method != 'tab'){
      this.props.unset();
    }*/
    this.setState({
      value: newValue
    });
  }


  onSuggestionsUpdateRequested({ value }) {
    this.setState({
      suggestions: getSuggestions(value)
    });
  }

  onSuggestionsFetchRequested({ value }){
    this.setState({
      suggestions: getSuggestions(value)
    });
  }; 

  onSuggestionsClearRequested(){
    this.setState({
      suggestions: []
    });
  };

  render() {

    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Enter time...',
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest suggestions={suggestions}
                   onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                   getSuggestionValue={getSuggestionValue}
                   focusFirstSuggestion={true}
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
