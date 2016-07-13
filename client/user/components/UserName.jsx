import React, {Component} from 'react';



export default class UserName extends Component {
  updateName(event){  // Need one of these for each component
    event.preventDefault();
    var text= this.refs.username.value.trim();
    Meteor.call('updateName', text);
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

    let user = this.getUser();
    console.log("UserName:");
    console.log(user);

  	if(!user){
  		return (<div>Loading...</div>);
  	}
  	var name = user.name;

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
