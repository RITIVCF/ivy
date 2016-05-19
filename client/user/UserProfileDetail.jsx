import React, {Component} from 'react';
import EthnicitySelect from '../ethnicity/EthnicitySelect.jsx';

export default class UserProfileDetail extends Component {
  constructor() {
    super();

    this.state = {
      subscription: {
        Ethnicities: Meteor.subscribe("allEthnicities")
        // Events: Meteor.subscribe("publishedEvents")  // for only grabbing published events
        //  on the public site.
      }
    };
  }

  componentWillUnmount() {
    this.state.subscription.Ethnicities.stop();
  }


  updateName(event){  // Need one of these for each component
    event.preventDefault();
    var text= this.refs.username.value.trim();
    Meteor.call('updateName', text);
    console.log(text);
    this.state.value = text;
  }

  handleNameChange(event){ // need one of these for each component
    this.setState({name:event.target.value});
  }

  handleEmailChange(event){
    this.setState({email:event.target.value});
  }

  updateEmail(event){
    event.preventDefault();
    var text = this.refs.useremail.value.trim();
    Meteor.call('updateEmail', text);
    console.log(text);
    this.state.value = text;
  }

  handleIntlChange(event){
    event.preventDefault();
    var intl = this.refs.intl.checked;
    Meteor.call('toggleInternational', intl);
  }

  handleEthnChange(event){
    event.preventDefault();
    var ethn = this.refs.ethn.value;
    Meteor.call('updateEthnicity', intl);
  }



  ethnicities(){
    return Ethnicities.find().fetch();
  }


  render() {
    console.log(this.props.userdetail);
    console.log(this.props.userdetail.profile.name);
    var name = this.props.userdetail.profile.name;
    var email = this.props.userdetail.emails[0].address;
    return (
      <div>
        <div class="header">
          <h1>My Profile</h1>
        </div>
        <div class="row">
          <div class="c 6">
            <form>
              <input type="text"
                ref="username"
                onBlur={this.updateName.bind(this)}
                onChange={this.handleNameChange}
                value={name}
              />
            <input type="text"
              ref="useremail"
              onBlur={this.updateEmail.bind(this)}
              onChange={this.handleEmailChange}
              value={email}
            />
          {/*}
          <label for="intl">International Student</label>
          <input type="checkbox" ref="intl" id="intl" onChange={this.handleIntlChange.bind(this)} />
          <select ref="ethn" > {/*onChange={this.handleEthnChange.bind(this)}
            {this.ethnicities().map( (ethnicity)=>{
              return <EthnicitySelect key={ethnicity._id} ethnicity={ethnicity} />
            })}
          </select>*/}
            </form>
            <form>
              <input type="text" ref="newemail" />
              <button onClick={this.addEmail.bind(this)}>Add Email</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
