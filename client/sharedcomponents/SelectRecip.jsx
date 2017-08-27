import Autosuggest from 'react-autosuggest';
import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';



function getList(){
  var list = [];
  Meteor.users.find().fetch().forEach((user)=>{
    user.isUser=true;
    list.push(user);
  });
  Groups.find().fetch().forEach((group)=>{
    group.isGroup=true;
    list.push(group);
  })
  return list;
}

const getSuggestions = value => {
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
    <span>
      <i className="material-icons">{suggestion.isUser?"person":"group"}</i>
      {suggestion.name}
      {suggestion.isUser&&<span style={{float: "right"}}>{suggestion.emails&&suggestion.emails[0].address}</span>}
    </span>

  );
}

const shouldRenderSuggestions = value => {
  return value.trim().length > 2;
}

const inputComponent = inputProps => {
  return <div className="input-field select-dropdown">
    <input id="name" {...inputProps} />
    <label htmlFor="name">{inputProps.label}</label>
  </div>
}


export default class SelectRecip extends React.Component {
  constructor(props) {
    super(props);

    unCreated = props.unCreated;

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
    this.props.updateRecip(suggestion);
    if(!this.props.unset){
        this.setState({value: ''});
    }
    else{
      this.setState({value: suggestion.name});
    }
  }

  onBlur(){
    Materialize.updateTextFields();
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
      label: this.props.label?this.props.label:"Recipient Name",
      value,
      onChange: this.onChange,
      onBlur: this.onBlur
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
					renderInputComponent={inputComponent}
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
					renderInputComponent={inputComponent}
					onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
					onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
				/>
      );
    }

  }
}
