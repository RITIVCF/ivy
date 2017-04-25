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
    let addresses = this.props.contact.getAddresses();
    return (
      <div className="card">
        <div className="card-content">
          <span className="card-title">Addresses
            {!this.props.disabled&&
              <a className="btn btn-floating waves-effect waves-light right" onClick={this.addAddress.bind(this)}>
                <i className="material-icons">add</i>
              </a>
            }</span>
          <ul className="collection">
            {addresses.length > 0 ? addresses.map( (address)=>{
      				return <Address key={address.line1} disabled={this.props.disabled} contact={this.props.contact} address={address} />
      			}):<li className="collection-item" ><p>No Addresses</p></li>}
          </ul>
          <NewAddressModal ref="modal" contact={this.props.contact} />
        </div>
      </div>
    )
  }
}
