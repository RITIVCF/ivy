import React, {Component} from 'react';



export default class ContactEmail extends Component {
  handleEmailChange(event){
    this.setState({email:event.target.value});
  }

  updateEmail(event){
    event.preventDefault();
    var text = this.refs.email.value.trim();
    Meteor.call('updateEmail', this.props.contact._id, text);
    console.log(text);
    this.state.value = text;
  }

  getContact(){
		//console.log(Events.find({_id: this.props.eid}).fetch());
		//return Events.find({_id: this.props.eid}).fetch();
		return Contacts.findOne({_id:Meteor.user().contact});
	}


  render(){
    /*
    let contact = this.props.contact;

  	if(!contact.email){
  		return (<div>Loading...</div>);
  	}
    */

    return(
      <div className="form-group" >
        <label>Email</label>
          <input type="text"
            ref="email"
            className="form-control"
            disabled={this.props.disabled}
            onBlur={this.updateEmail.bind(this)}
            onChange={this.handleEmailChange}
            value={this.props.contact.email}
          />
      </div>
    )
  }
}
