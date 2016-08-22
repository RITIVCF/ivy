import Autosuggest from 'react-autosuggest';
import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';



function getList(users){
    if(users){
      var users = Meteor.users.find().fetch();
      users.forEach(function(user){
        console.log(user.contact);
        user.name = Contacts.findOne(user.contact).name;

      });
      console.log(users);
      return users;
    }
    else{
      return Contacts.find().fetch();
    }

}

function getSuggestions(value, users) {
  //users: true, find Users
  //       fasle, use contacts
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  if(users){
    return inputLength === 0 ? [] : getList(users).filter(user =>
      user.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  }
  else{
    return inputLength === 0 ? [] : getList(users).filter(contact =>
      contact.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  }

}

function getSuggestionValue(suggestion) { // when suggestion selected, this function tells
  return suggestion.name;                 // what should be the value of the input
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}

function shouldRenderSuggestions(value) {
  return value.trim().length > 1;
}





export default class SelectContact extends TrackerReact(React.Component) {
  constructor(props) {
    super(props);

    if(props.users){
      this.state = {
        value: '',
        suggestions: getSuggestions('',true)
      };
    }
    else{
      this.state = {
        value: '',
        suggestions: getSuggestions('', false)
      };
    }

    console.log(this.state.value);
    console.log(props.initialValue);
    console.log(props.id);
    if(props.initialValue){
      //this.setState({value:this.props.initialValue});
      this.state.value = props.initialValue;
      //this.state.initialValue = props.initialValue;
    }
    console.log(this.state.value);

    this.onChange = this.onChange.bind(this);
    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
  }

shouldComponentUpdate(nextProps, nextState){
  //console.log("this state: "+ this.state.value);
  //console.log("next state: "+ nextState.value)
  if(this.state.value=nextState.value){
    console.log(this.props.initialValue);
    //if(!(this.state.initialValue == this.props.initialValue)){
      this.state.value=nextProps.initialValue;
      //console.log("Component updated");
    //}
  }
  return true;
}

  onSuggestionSelected(event, { suggestion, suggestionValue, sectionIndex, method }){
    // I need to do something with suggestion. This holds the contact info.
    console.log(suggestion);
    //this.setState({value:suggestion.name});
    suggestion.component = this;
    this.props.updateContact(suggestion);
  }


  onChange(event, { newValue, method }) {
    console.log(method);
    if(method != 'tab'){
      this.props.unset();
    }
    const value = event.target.value;
    console.log("value");
    console.log(value);
    if(typeof newValue !== 'undefined') {
        this.setState({
            value: newValue
        });
    }
    // this.setState({
    //   value: newValue
    // });
  }


  onSuggestionsUpdateRequested({ value }) {
    var users = true;
    if(!this.props.users){
      users = false;
    }
    this.setState({
      suggestions: getSuggestions(value, users)
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
                     focusFirstSuggestion={true}
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
                     focusFirstSuggestion={true}
                     onSuggestionSelected={this.onSuggestionSelected.bind(this)}
                     focusInputOnSuggestionClick={false}
                     shouldRenderSuggestions={shouldRenderSuggestions}
                     renderSuggestion={renderSuggestion}
                     inputProps={inputProps} />
      );
    }

  }
}
