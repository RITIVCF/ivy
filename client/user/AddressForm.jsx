import React, {Component} from 'react';
import Address from './Address.jsx';

export default class AddressForm extends Component {
  // props are: address list from user object
  /*
  addresses(){
    console.log(this.props.addresses);
    return this.props.addresses;
  }*/

  addAddress(){
    //Meteor.call('addMailingAddress');
    Meteor.call('addMailingAddress', this.props.user._id);
  }

  render(){
    if(!this.props.user.addresses){
      return(<div>Loading...</div>)
    }
    return (
    <div>
        <button onClick={this.addAddress.bind(this)}>Add New Address</button>
      <ul>
        {this.props.user.addresses.map( (address)=>{
  				return <Address key={address.line1} user={this.props.user} address={address} />
  			})}
      </ul>
    </div>
  )
  }
}
