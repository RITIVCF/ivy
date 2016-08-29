import React, {Component} from 'react';
import Address from './Address.jsx';

export default class AddressForm extends Component {
  // props are: address list from contact object
  /*
  addresses(){
    console.log(this.props.addresses);
    return this.props.addresses;
  }*/

  addAddress(){
    //Meteor.call('addMailingAddress');
    Meteor.call('addMailingAddress', this.props.contact._id);
  }

  render(){
    if(!this.props.contact.addresses){
      return(<div>Loading...</div>)
    }
    return (
    <div>
      {this.props.disabled ? <div></div>  :
        <button onClick={this.addAddress.bind(this)}>Add New Address</button>}
      <ul>
        {this.props.contact.addresses.map( (address)=>{
  				return <Address key={address.line1} disabled={this.props.disabled} contact={this.props.contact} address={address} />
  			})}
      </ul>
    </div>
  )
  }
}
