import React, {Component} from 'react';
import Address from './Address.jsx';
import NewAddressModal from './NewAddressModal.jsx';

export default class AddressForm extends Component {
  // props are: address list from contact object
  /*
  addresses(){
    console.log(this.props.addresses);
    return this.props.addresses;
  }*/


  addAddress(){
    //Meteor.call('addMailingAddress');
    //Meteor.call('addMailingAddress', this.props.contact._id);
    // console.log($('#newaddressmodal'));
    // $('#newaddressmodal').modal('open');
    this.refs.modal.open();
  }

  render(){
    if(!this.props.contact.addresses){
      return(<div>Loading...</div>)
    }
    return (
    <div>
      {this.props.disabled ? <div></div>  :
        <a className="btn waves-effect waves-light" onClick={this.addAddress.bind(this)}>Add New Address</a>}
      <ul className="collection">
        {this.props.contact.addresses.map( (address)=>{
  				return <Address key={address.line1} disabled={this.props.disabled} contact={this.props.contact} address={address} />
  			})}
      </ul>
      <NewAddressModal ref="modal" contact={this.props.contact} />
    </div>
  )
  }
}
