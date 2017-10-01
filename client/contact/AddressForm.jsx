import React, {Component} from 'react';
import Address from './Address.jsx';
import NewAddressModal from './NewAddressModal.jsx';

export default class AddressForm extends Component {
	constructor(){
		super();

		this.state = {
			open: false
		};

		this.closeModal = this.closeModal.bind(this);
	}
  // props are: address list from contact object

  addAddress(){
    this.setState({open: true});
  }

	closeModal(){
		this.setState({open: false});
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
          <NewAddressModal
						open={this.state.open}
						onClose={this.closeModal}
						ref="modal" contact={this.props.contact}
					/>
        </div>
      </div>
    )
  }
}
