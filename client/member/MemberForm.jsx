import React, {Component} from 'react';
//import EthnicitySelect from './ethnicityselect.jsx';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import EthnicitySingle from './ethnicitysingle.jsx';


export default class MemberForm extends TrackerReact(React.Component) {
  addMember(event){
    event.preventDefault();
    console.log(this);


    //Meteor.call('addMember');
    }
    ethnicities() {
      return Ethnicities.find().fetch();
    }
    hideShowEthnicity(){
      console.log(this);
      /*
      if(this.refs.intl.checked=true){
        this.refs.ethn.disabled = true;
        console.log("Disabled");
      }
      else {
        this.refs.ethn.disabled = false;
        console.log("Enabled");
      }
      */

    }

    render() {
      return (
        <div>
        <h1>Set Membership Info</h1>
        <h2>Intervarsity requires we keep track of our membership information. Please update the fields below. Thank you!</h2>
        <form className="publicForm" onSubmit={this.addMember.bind(this)}>
          <label>Expected Graduation Term:*</label>
          <select ref="term">
            <option>Fall 2016</option>
            <option>Spring 2017</option>
            <option>Fall 2017</option>
            <option>Spring 2018</option>
          </select>
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
          <label>International Student:</label>
          <label>Yes:</label>
          <input ref="intl" type="checkbox" onClick={this.hideShowEthnicity.bind(this)}></input>
          <label>Ethnicity:*</label>
            <select ref="ethn">
              {this.ethnicities().map( (ethnicity)=>{
                return <EthnicitySingle key={ethnicity._id} ethnicity={ethnicity} />
              })}
            </select>
          <label>Campus Affiliations:</label>
          <label>Nursing:</label>
          <input ref="nursing" type="checkbox"></input>
          <label>Greek Life:</label>
          <input ref="greek" type="checkbox"></input>
          <label>Arts:</label>
          <input ref="arts" type="checkbox"></input>
          <label>Atheltics:</label>
          <input ref="atheltics" type="checkbox"></input>
          <label>Community Involvement:</label>
          <label>I attend church regularly:</label>
          <input ref="church" type="checkbox"></input>
          <label>I volunteer regularly:</label>
          <input ref="volunteer" type="checkbox"></input>
          <input type="submit"></input>
        </form>
        <a href="/about"><button>Cancel</button></a>
      </div>
      )
    }
  }
