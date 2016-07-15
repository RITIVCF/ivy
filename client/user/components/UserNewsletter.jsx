import React, {Component} from 'react';



export default class UserNewsletter extends Component {
  updateNewsletter(event){  // Need one of these for each component
    event.preventDefault();
    var text= this.refs.newsletter.checked;
    Meteor.call('updateNewsletter', this.props.user._id, text);
    console.log(text);
  }

  getUser(){
		//console.log(Events.find({_id: this.props.eid}).fetch());
		//return Events.find({_id: this.props.eid}).fetch();
		return Meteor.user();
	}


  render(){
    let user = this.props.user;

  	if(!user.newsletter){
  		return (<div>Loading...</div>);
  	}

    return(
      <div>
        <label>Would you like to receive the RIT IVCF Newsletter?</label>
          <input type="checkbox"
            readOnly={true}
            ref="newsletter"
            onClick={this.updateNewsletter.bind(this)}
            checked={user.newsletter}
          />
      </div>
    )
  }
}
