import React, {Component} from 'react';



export default class ContactEmail extends Component {
  handleEmailChange(event){
    this.setState({email:event.target.value});
  }

  updateEmail(event){
    event.preventDefault();
    var text = this.refs.email.value.trim();
    if(this.props.contact.emails[0].address==text){
      return;
    }
    var thiz = this;
    Meteor.call('updateUserEmail', this.props.contact._id, this.props.contact.emails[0].address, text, (error)=>{
      if(error){
        console.debug(error)
        window.alert("Email Already exists.")

      }
      // else{
      //   thiz.state.value = text;
      // }
    });
    //console.log(text);
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
    {/*this.props.disabled*/}
    return(
      <div>
        <label>Email</label>
          <input type="text"
            ref="email"
            disabled={this.props.contact.emails[0].verified}
            onBlur={this.updateEmail.bind(this)}
            onChange={this.handleEmailChange}
            value={this.props.contact.emails[0].address}
          />
      </div>
    )
  }
}
