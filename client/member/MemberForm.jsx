import React, {Component} from 'react';

import TrackerReact from 'meteor/ultimatejs:tracker-react';
import EthnicitySelect from '../ethnicity/EthnicitySelect.jsx';
import SelectOption from '../sharedcomponents/SelectOption.jsx';


export default class MemberForm extends TrackerReact(React.Component) {
  constructor(){
    super();
    this.state={
      intl: false
    };
  }

  addMember(event){
    event.preventDefault();
    //console.log(event.target.value);
    //console.log(this);
    var cid = Meteor.user().contact;

    Meteor.call("updateGender", cid, this.refs.gender.value);
    if(!this.refs.intl.checked){
      Meteor.call("updateContactIntl", cid, this.refs.intl.checked);
      Meteor.call("updateEthnicity", cid, this.refs.ethn.value);
    }
    else{
        Meteor.call("updateContactIntl", cid, this.refs.intl.checked);
        Meteor.call("updateEthnicity", cid, "");
    }
    Meteor.call("updateGradTerm", cid, this.refs.gradterm.value);
    Meteor.call("updateCurrYear", cid, this.refs.year.value);

    ////console.log(this.refs.affiliations);


    for (var property in this.refs) {   // iterate over properties
      if (this.refs.hasOwnProperty(property)) {   // make sure they aren't inhereted properties, only relevant
        if(this.getAffiliations().indexOf(this.refs[property].name)+1){ // is it checked?
          if(this.refs[property].checked){
              Meteor.call("updateContactAffiliations", cid, this.refs[property].name, false); // false means add
          }
        }
        if(this.getCommunityLife().indexOf(this.refs[property].name)+1){
          if(this.refs[property].checked){ // is it checked?
              Meteor.call("updateCommunityLife", cid, this.refs[property].name, false);
          }
        }
      }
    }

    Meteor.call("updateMember", cid, true);

    }

    check(event){
      event.preventDefault();
      //console.log(this);
    }

    ethnicities() {
      return Options.findOne("ethnicities").vals;
    }

    hideShowEthnicity(){
      this.setState({intl: this.refs.intl.checked});
    }

    getGradTerms(){
      return Options.findOne({_id:"gradterms"}).vals;
    }

    getAffiliations(){
      return Options.findOne({_id:"campusaffiliations"}).vals;
    }

    getCommunityLife(){
      return Options.findOne({_id:"communitylife"}).vals;
    }

    getEthnicities(){
      return Options.findOne({_id:"ethnicities"}).vals;
    }

    render() {
      return (
        <div>
        <h1>Set Membership Info</h1>
        <h2>Intervarsity requires we keep track of our membership information. Please update the fields below. Thank you!</h2>
        <form className="publicForm" onSubmit={this.addMember.bind(this)}>
          <label>Expected Graduation Term:*</label>
          <select ref="gradterm">
            {this.props.subscription.ready() ? this.getGradTerms().map( (term)=>{
                return <SelectOption key={term} value={term} displayvalue={term}  />
            }):<option></option>}
          </select>
          <br/>
          <label>Current Year Level:*</label>
          <select ref="year">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
          </select>
          <br/>
          <label>International Student:</label>
          <label>Yes:</label>
          <input ref="intl"
            type="checkbox"
            onClick={this.hideShowEthnicity.bind(this)}
            />
          {!this.state.intl ?
          <label>Ethnicity:*
          <select ref="ethn" >
            <option value={""}></option>
            {this.getEthnicities().map( (ethnicity)=>{
              return <option key={ethnicity} value={ethnicity} >{ethnicity}</option>
            })}
          </select>
        </label>:<div></div>}
            <br />
          <label>Gender: *
            <select ref="gender" >
              <option value={"na"}>Not Specified</option>
              <option value={"male"}>Male</option>
              <option value={"female"}>Female</option>
            </select>
          </label>
          <br/>
          <label>Campus Affiliations:</label>
            {this.props.subscription.ready() ? this.getAffiliations().map( (tag)=>{
              return <label key={tag} >{tag}: <input type="checkbox" ref={"affiliations."+tag} name={tag} />
            </label>
            }) :<div></div> }
            <br/>
          <label>Community Involvement:</label>
            {this.props.subscription.ready() ? this.getCommunityLife().map( (tag)=>{
              return <label key={tag} >{tag}: <input type="checkbox" ref={"communitylife."+tag} name={tag} />
            </label>
            }) :<div></div>}
          <input type="submit"></input>
        </form>
      </div>
      )
    }
  }
