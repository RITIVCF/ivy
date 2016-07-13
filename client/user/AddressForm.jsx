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
    Meteor.call('addMailingAddress');
  }

  render(){
    let ev = this.props.addresses;
  	//console.log(ev);
  	if(!ev){
  		return (<div>Loading...</div>);
  	}
    return (
    <div>
        <button onClick={this.addAddress.bind(this)}>Add New Address</button>
      <ul>
        {this.props.addresses.map( (address)=>{
  				return <Address key={address.line1} address={address} />
  			})}
      </ul>
    </div>
  )
  }
}
