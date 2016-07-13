import React, {Component} from 'react';



export default class UserNewsletter extends Component {
  updateNewsletter(event){  // Need one of these for each component
    event.preventDefault();
    var text= this.refs.newsletter.checked;
    Meteor.call('updateNewsletter', text);
    console.log(text);
  }

  getUser(){
		//console.log(Events.find({_id: this.props.eid}).fetch());
		//return Events.find({_id: this.props.eid}).fetch();
		return Meteor.user();
	}


  render(){
    let user = this.getUser();

  	if(!user){
  		return (<div>Loading...</div>);
  	}
  	var newsletter = user.newsletter;

    return(
      <div>
        <label>Newsletter</label>
          <input type="checkbox"
            readOnly={true}
            ref="newsletter"
            onClick={this.updateNewsletter.bind(this)}
            checked={newsletter}
          />
      </div>
    )
  }
}
