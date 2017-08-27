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

  componentDidMount(){
    $('.modal').modal();
    $('select').material_select();
  }

  open(){
    $("#memberform").appendTo("body").modal("open");
  }

  addMember(event){
    event.preventDefault();

    var cid = Meteor.userId();

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
      $("#memberform").appendTo("body").modal("open");
  }

  check(event){
    event.preventDefault();
  }

  ethnicities() {
    return Options.findOne("ethnicities").vals;
  }

  hideShowEthnicity(){
    if(!this.state.intl){
      $('#ethn').material_select('destroy');
    } // if removing, destroy before the element is removed
    this.setState({intl: this.refs.intl.checked});
  }

  componentDidUpdate(){
    if(!this.state.intl){
      $('select').material_select();
    }//initialize after select has be rendered
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
      <div id="memberform" className="modal bottom-sheet modal-fixed-footer" style={{height: "100%"}}>
        <form onSubmit={this.addMember.bind(this)}>
          <div className="modal-content">
            <div className="row">
              <h3>Set Membership Info</h3>
              <p>InterVarsity Christian Fellowship/USA requires we keep track of our membership
							information. Please tell us about yourself below. Thank you!</p>
              <div className="divider"></div>
              <br/>
							<div className="col s12">
								<div className="input-field">
									<select ref="gradterm" value="">
										<option value="" disabled>Select graduation term</option>
										{this.getGradTerms().map( (term)=>{
											return <SelectOption key={term} value={term} displayvalue={term}  />
										})}
									</select>
									<label>Expected Graduation Term:*</label>
								</div>
								<br/>
								<div className="input-field">
									<select ref="year" value="">
										<option value="" disabled>Select year</option>
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
									</select>
									<label>Current Year Level:*</label>
								</div>
							</div>
							<div className="col s12">
								<p>International Student:</p>
								<input ref="intl"
									id="intl"
									type="checkbox"
									onClick={this.hideShowEthnicity.bind(this)}
								/>
								<label htmlFor="intl">Yes:</label>
								{!this.state.intl &&<div className="input-field">
									<select ref="ethn" value="" id="ethn">
										<option value={""} disabled>Select ethnicity</option>
										{this.getEthnicities().map( (ethnicity)=>{
											return <option key={ethnicity} value={ethnicity} >{ethnicity}</option>
										})}
									</select>
									<label>Ethnicity:*</label>
								</div>}
								<div className="input-field">
									<select ref="gender" value="">
										<option value="" disabled>Select gender</option>
										<option value={"na"}>Not Specified</option>
										<option value={"male"}>Male</option>
										<option value={"female"}>Female</option>
									</select>
									<label>Gender: *</label>
								</div>
							</div>
							<div className="divider"></div><br/>
							<div className="col s12">
								<p>Campus Affiliations:</p>
								{this.getAffiliations().map( (tag)=>{
									return <div key={tag} >
										<input type="checkbox" ref={"affiliations."+tag} id={tag} name={tag} />
										<label htmlFor={tag} >{tag}: </label>
									</div>
								})}
							</div>
							<div className="col s12">
								<p>Community Involvement:</p>
								{this.getCommunityLife().map( (tag)=>{
									return <div key={tag} >
										<input type="checkbox" ref={"communitylife."+tag} id={tag} name={tag} />
										<label htmlFor={tag}>{tag}: </label>
									</div>
								})}
							</div>
            </div>
          </div>
          <div className="modal-footer">
            <a className="modal-action modal-close waves-effect waves-light btn-flat">Close</a>
            <input type="submit" className="modal-action modal-close waves-effect waves-light btn-flat" value="Submit"/>
          </div>
        </form>
      </div>
    )
  }
}
