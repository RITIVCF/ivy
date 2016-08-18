import React, {Component} from 'react';



export default class ContactNewsletter extends Component {
  updateNewsletter(event){  // Need one of these for each component
    event.preventDefault();
    var text= this.refs.newsletter.checked;
    Meteor.call('updateNewsletter', this.props.contact._id, text);
    console.log(text);
  }


  render(){
    let contact = this.props.contact;
    /*
  	if(!contact.newsletter){
  		return (<div>Loading...</div>);
  	}*/

    return(
      <div>
        <label>I would like to receive the RIT IVCF Newsletter: </label>
          <input type="checkbox"
            readOnly={true}
            ref="newsletter"
            disabled={this.props.disabled}
            onClick={this.updateNewsletter.bind(this)}
            checked={contact.newsletter}
          />
      </div>
    )
  }
}
