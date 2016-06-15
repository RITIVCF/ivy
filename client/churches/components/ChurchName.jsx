import React, {Component} from 'react';



export default class ChurchName extends Component {
  updateName(event){
		event.preventDefault();
		console.log("Name: "+this.refs.name);
		Meteor.call("updateChurchName", this.props.cid, this.refs.name.value);
		//this.state.value = this.refs.name;
	}

  handleNameChange(event){ // need one of these for each component
    this.setState({name:event.target.value});
  }

  getChurch(){
		//console.log(Events.find({_id: this.props.eid}).fetch());
		//return Events.find({_id: this.props.eid}).fetch();
		return Churches.findOne(this.props.cid);
	}


  render(){
    let ch = this.getChurch();

  	if(!ch){
  		return (<div>Loading...</div>);
  	}
  	var name = ch.name;

    return(
      <div>
        <label>Name</label>
        <input type="text" ref="name" value={name} onBlur={this.updateName.bind(this)} onChange={this.handleNameChange} />
      </div>
    )
  }
}
