import React, {Component} from 'react';



export default class ContactMajor extends Component {
  updateMajor(event){  // Need one of these for each component
    event.preventDefault();
    var text= this.refs.major.value.trim();
    Meteor.call('updateMajor', this.props.contact._id, text);
    //console.log(text);
    //this.state.value = text;
  }

  handleMajorChange(event){ // need one of these for each component
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
      <div className="form-group">
        <label>Major</label>
          <input type="text"
            ref="major"
            className="form-control"
            disabled={this.props.disabled}
            onBlur={this.updateMajor.bind(this)}
            onChange={this.handleMajorChange}
            value={this.props.contact.major}
          />
      </div>
    )
  }
}
