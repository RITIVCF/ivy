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
      // users.forEach(function(user){
      //   //console.log(user.contact);
      //   user.name = Contacts.findOne(user.contact).name;
      //
      // });
      //console.log(users);
      return users;


}

const getSuggestions = value => {
  //users: true, find Users
  //       fasle, use contacts
  console.log("getSuggestions value: ", value);
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
    <span>{suggestion.name}<span style={{float: "right"}}>{suggestion.emails&&suggestion.emails[0].address}</span></span>
  );
}

const shouldRenderSuggestions = value => {
  return value.trim().length > 1;
}

const inputComponent = inputProps => {
  return <div className="input-field select-dropdown">
    <input id="name" {...inputProps} required />
    <label htmlFor="name">Name</label>
  </div>
}




export default class SelectUser extends React.Component {
  constructor(props) {
    super(props);

    unCreated = props.unCreated;

      this.state = {
        value: '',
        suggestions: getSuggestions('')
      };


    //console.log(this.state.value);
    //console.log(props.initialValue);
    //console.log(props.id);
    if(props.initialValue){
      //this.setState({value:this.props.initialValue});
      this.state.value = props.initialValue;
      //this.state.initialValue = props.initialValue;
    }
    //console.log(this.state.value);

    this.onChange = this.onChange.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
  }

shouldComponentUpdate(nextProps, nextState){
  ////console.log("this state: "+ this.state.value);
  ////console.log("next state: "+ nextState.value)
  if(this.state.value=nextState.value){
    //console.log(this.props.initialValue);
    //if(!(this.state.initialValue == this.props.initialValue)){
      this.state.value=nextProps.initialValue;
      ////console.log("Component updated");
    //}
  }
  return true;
}

  onSuggestionSelected(event, { suggestion, suggestionValue, sectionIndex, method }){
    // I need to do something with suggestion. This holds the contact info.
    //console.log(suggestion);
    //this.setState({value:suggestion.name});
    suggestion.component = this;
    this.props.updateUser(suggestion);
    // console.log("UNSET PROP:", this.props.unset);
    // console.log("suggestion selected this.state: ", this.state);
    if(!this.props.unset){
      // console.log("UNSET PROP FALSE");
        this.setState({value: ''}, function(){
          //console.log("NOT keeping name:", this.state);
        });
    }
    else{
      this.setState({value: suggestion.name}, function(){
        //console.log("keeping name:", this.state);
      });
    }
  }


  onChange(event, { newValue, method }) {
    Materialize.updateTextFields();
    if(method != 'tab'){
      if(this.props.unset){
        this.props.unset();
      }
    }
    const value = event.target.value;
    //console.log("value");
    // console.log("State Value:", this.state.value);
    // console.log("On Change Value: ", newValue);
    // if(typeof newValue !== 'undefined') {
    //     this.setState({
    //         value: newValue
    //     });
    // }
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
    Materialize.updateTextFields();
    const { value, suggestions } = this.state;
    const inputProps = {
      value,
      onChange: this.onChange
    };
    //console.log("ID PROP:",this.props.id);
    if(this.props.id){
      //console.log("PROP IS TRUE");
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
                     onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
                     onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
                     />
      );
    }

  }
}
