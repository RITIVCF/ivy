import React, {Component} from 'react';



export default class UserName extends Component {
  updateName(event){  // Need one of these for each component
    event.preventDefault();
    var text= this.refs.username.value.trim();
    Meteor.call('updateName', this.props.user._id, text);
    console.log(text);
    //this.state.value = text;
  }

  handleNameChange(event){ // need one of these for each component
    this.setState({name:event.target.value});
  }

  getUser(){
		//console.log(Events.find({_id: this.props.eid}).fetch());
		//return Events.find({_id: this.props.eid}).fetch();
		return Meteor.user();
	}


  render(){

    let user = this.props.user;

  	if(!user.name){
  		return (<div>Loading...</div>);
  	}

    return(
      <div>
        <label>Name</label>
          <input type="text"
            ref="username"
            onBlur={this.updateName.bind(this)}
            onChange={this.handleNameChange}
            value={user.name}
          />
      </div>
    )
  }
}
