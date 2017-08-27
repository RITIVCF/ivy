import Autosuggest from 'react-autosuggest';
import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';



function getList(){
  if(unCreated){
    var users = Meteor.users.find({emails: {$elemMatch: {verified: false}}}).fetch();
  }
  else{
    var users = Meteor.users.find().fetch();
  }

  return users;

}

const getSuggestions = value => {
  //users: true, find Users
  //       fasle, use contacts
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : getList().filter(user =>
    user.name.toLowerCase().slice(0, inputLength) === inputValue
  );



}

const getSuggestionValue = suggestion => { // when suggestion selected, this function tells
  return suggestion.name;                 // what should be the value of the input
}

const renderSuggestion = suggestion => {
  return (
      <span>{suggestion.name}
        <span style={{float: "right"}}>{suggestion.emails&&suggestion.emails[0].address}</span>
      </span>

  );
}

const shouldRenderSuggestions = value => {
  return value.trim().length > -1;
}

const inputComponent = inputProps => {
  return <div className="input-field select-dropdown">
    <input {...inputProps} required />
    <label htmlFor={inputProps.id}>{inputProps.label}</label>
  </div>
}


export default class SelectUser extends React.Component {
  constructor(props) {
    super(props);

    unCreated = props.unCreated;

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
    suggestion.component = this;
    this.props.updateUser(suggestion);
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
    this.setState({
      suggestions: getSuggestions(value)
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
