import React, {Component} from 'react';



export default class ContactNewsletter extends Component {
  updateNewsletter(event){ 
    event.preventDefault();
    var checked = this.refs.newsletter.checked;
    this.props.contact.setNewsletter(checked);
  }


  render(){
    let contact = this.props.contact;

    return(
      <div>
				<input type="checkbox"
					readOnly={true}
					ref="newsletter"
					className="form-control"
					id="news"
					name="news"
					disabled={this.props.disabled}
					onClick={this.updateNewsletter.bind(this)}
					checked={contact.getNewsletter()}
				/>
        <label htmlFor="news">I would like to receive the RIT IVCF Newsletter </label>
      </div>
    )
  }
}
