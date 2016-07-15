import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import EthnicitySelect from '../ethnicity/EthnicitySelect.jsx';
import AddressForm from './AddressForm.jsx';
import UserName from './components/UserName.jsx';
import UserEmail from './components/UserEmail.jsx';
import UserPhone from './components/UserPhone.jsx';
import UserNewsletter from './components/UserNewsletter.jsx';
import CampusAffiliations from './components/CampusAffiliations.jsx';
import CommunityLife from './components/CommunityLife.jsx';
import UserIntl from './components/UserIntl.jsx';
import UserGender from './components/UserGender.jsx';
import UserGradTerm from './components/UserGradTerm.jsx';
import UserCurrYear from './components/UserCurrYear.jsx';


export default class UserProfile extends TrackerReact(React.Component){
  /*constructor(props) {
    super(props);
    if(typeof props.uid === 'undefined'){
      this.state = {
        subscription: {
          Ethnicities: Meteor.subscribe("allEthnicities"),
          user: Meteor.subscribe("userSelf", Meteor.userId())
        }
      }
    }
    else{
      this.state = {
        subscription: {
          Ethnicities: Meteor.subscribe("allEthnicities"),
          user: Meteor.subscribe("userSelf", this.props.uid)
          }
        };

    }
  }

  componentWillUnmount() {
    this.state.subscription.Ethnicities.stop();
    this.state.subscription.user.stop();
  }*/


  userDetails() {
    if(typeof this.props.uid === 'undefined'){
        return Meteor.user(); //s.find({_id : Meteor.userId()}).fetch();
    }
    return Meteor.users.findOne(this.props.uid);
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




  render() {
    //console.log(this.state.subscription.user.ready());
    console.log("user:");
    let user = this.userDetails();
    console.log(user);

    return (
      <div>
        {(typeof this.props.uid === 'undefined') ? <h1>My User Profile</h1> : <h1>{user.name+"'s"} User Profile</h1>}
        <div class="row">
          <div class="c 12">
            <h2>General Info</h2>
            <UserName user={user} />
            <UserEmail user={user} />
            <UserPhone user={user} />
            <UserNewsletter user={user} />
            <br />
            {user.member ? <div>
              <h3>Campus Affiliations</h3>
              <CampusAffiliations user={user} />
                <h3>Community Life</h3>
                <CommunityLife user={user} /></div>:"" }


            <br />
          </div>
        </div>
        {user.member ?
        <div class="row">
          <div class="c 6">
            <h2>Personal Info</h2>
            <UserIntl user={user} />
            <UserGender user={user} />
          </div>
          <div class="c 6">
            <h2>University Status</h2>
            <UserGradTerm user={user} />
            <UserCurrYear user={user} />
          </div>
        </div>
        :<button>Become a Member</button>}
        <div class="row">
          <div class="c 6">
            <AddressForm user={user} addresses={user.addresses} />
          </div>
        </div>
      </div>
    )
  }
}
