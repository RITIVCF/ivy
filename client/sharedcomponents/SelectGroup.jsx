import Autosuggest from 'react-autosuggest';
import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';



function getList(ingroup){
  if (ingroup) {
		let groups = Groups.find(
			{$and: [
				{$or: [{leader: Meteor.userId()},{users: Meteor.userId()}]},
				{type: "Small Group"}
			]}
		).fetch()
    return groups;
  } else {
    return Groups.find().fetch();
  }
}

function getSuggestions(value, ingroup) {
  //users: true, find Users
  //       fasle, use contacts
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

	return inputLength === 0 ? [] : getList(ingroup).filter(group => {
			return group.name.toLowerCase().slice(0, inputLength) === inputValue
		}
	);

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

const inputComponent = inputProps => {
  return <div className="input-field">
    <input id="grp" {...inputProps} required />
    <label htmlFor="grp">{inputProps.label}</label>
  </div>
}



export default class SelectGroup extends TrackerReact(React.Component) {
  constructor(props) {
    super(props);

      let ingrouptrue = false;
      if (!!this.props.ingroup) {
        ingrouptrue = this.props.ingroup;
      }

      this.state = {
        value: '',
        ingroup: ingrouptrue,
        suggestions: getSuggestions('', ingrouptrue)
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
    this.props.updateContact(suggestion);
  }


  onChange(event, { newValue, method }) {
    //console.log(method);
    if(method != 'tab'){
      this.props.unset();
    }
    const value = event.target.value;
    //console.log("value");
    //console.log(value);
    if(typeof newValue !== 'undefined') {
        this.setState({
            value: newValue
        });
    }
    // this.setState({
    //   value: newValue
    // });
  }


  onSuggestionsFetchRequested({ value }) {
    this.setState({
      suggestions: getSuggestions(value, this.state.ingroup)
    });
  }

  onSuggestionsClearRequested(){
    // Autosuggest will call this function every time you need to clear suggestions.
    this.setState({
      suggestions: []
    });
  };

  render() {

    const { value, suggestions } = this.state;
    const inputProps = {
      label: this.props.label?this.props.label:"Group",
      value,
      onChange: this.onChange
    };
    if(this.props.id){
      return (
        <Autosuggest id={this.props.id}
                    suggestions={suggestions}
                    getSuggestionValue={getSuggestionValue}
                    focusFirstSuggestion={true}
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
                     focusFirstSuggestion={true}
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
