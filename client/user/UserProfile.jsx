import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import EthnicitySelect from '../ethnicity/EthnicitySelect.jsx';
import AddressForm from './AddressForm.jsx';
import UserName from './components/UserName.jsx';
import UserEmail from './components/UserEmail.jsx';
import UserPhone from './components/UserPhone.jsx';
import UserNewsletter from './components/UserNewsletter.jsx';


export default class UserProfile extends TrackerReact(React.Component){
  constructor() {
    super();

    this.state = {
      subscription: {
        Ethnicities: Meteor.subscribe("allEthnicities"),
        user: Meteor.subscribe("userSelf")

      }
    };
  }

  componentWillUnmount() {
    this.state.subscription.Ethnicities.stop();
    this.state.subscription.user.stop();
  }

  userDetails() {
		return Meteor.user(); //s.find({_id : Meteor.userId()}).fetch();
	}




  handleIntlChange(event){
    event.preventDefault();
    var intl = this.refs.intl.checked;
    Meteor.call('toggleInternational', intl);
  }

  handleEthnChange(event){
    event.preventDefault();
    var ethn = this.refs.ethn.value;
    Meteor.call('updateEthnicity', ethn);
  }



  ethnicities(){
    return Ethnicities.find().fetch();
  }


  render() {
    console.log("user:");
    let user = this.userDetails();
    console.log(user);

    if(!user){
      return(<div>Loading...</div>)
    }
    return (
      <div>
        <h1>My User Profile</h1>
        <div class="row">
          <div class="c 6">
            <form>
              <UserName />
              <UserPhone />
              <UserNewsletter />

        {/*}
          <label for="intl">International Student</label>
          <input type="checkbox" ref="intl" id="intl" onChange={this.handleIntlChange.bind(this)} />
          <select ref="ethn" > {/*onChange={this.handleEthnChange.bind(this)}
            {this.ethnicities().map( (ethnicity)=>{
              return <EthnicitySelect key={ethnicity._id} ethnicity={ethnicity} />
            })}
          </select>*/}
            </form>
            {/*}
            <form>
              <input type="text" ref="newemail" />
              <button onClick={this.addEmail.bind(this)}>Add Email</button>
            </form>
            */}
            <AddressForm addresses={user.addresses} />
          </div>
        </div>
      </div>
    )
  }
}
