import React, {Component} from 'react';



export default class ContactName extends Component {
  updateName(event){  // Need one of these for each component
    event.preventDefault();
    var text= this.refs.name.value.trim();
    Meteor.call('updateName', this.props.contact._id, text);
    console.log(text);
    //this.state.value = text;
  }

  handleNameChange(event){ // need one of these for each component
    this.setState({name:event.target.value});
  }

  getContact(){
		//console.log(Events.find({_id: this.props.eid}).fetch());
		//return Events.find({_id: this.props.eid}).fetch();
		return Contacts.findOne({_id:Meteor.user().contact});
	}


  render(){
    /*
    let contact = this.props.contact;

  	if(!contact.name){
  		return (<div>Loading...</div>);
  	}
    */
    return(
      <div className="form-group" >
        <label>Name</label>
          <input type="text"
            ref="name"
            className="form-control"
            disabled={this.props.disabled}
            onBlur={this.updateName.bind(this)}
            onChange={this.handleNameChange}
            value={this.props.contact.name}
          />
      </div>
    )
  }
}
