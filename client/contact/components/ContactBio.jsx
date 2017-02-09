import React, {Component} from 'react';



export default class ContactBio extends Component {

  componentDidMount(){
    $('textarea').trigger('autoresize');  
  }

  updateBio(event){  // Need one of these for each component
    event.preventDefault();
    var text= this.refs.bio.value.trim();
    Meteor.call('updateBio', this.props.contact._id, text);
    //console.log(text);
    //this.state.value = text;
  }

  handleBioChange(event){ // need one of these for each component
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

          <textarea
            ref="bio"
            className="materialize-textarea"
            rows="4"
            disabled={this.props.disabled}
            onBlur={this.updateBio.bind(this)}
            onChange={this.handleBioChange}
            value={this.props.contact.bio}
          />

    )
  }
}
