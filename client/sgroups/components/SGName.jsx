import React, {Component} from 'react';



export default class SGName extends Component {
  updateName(event){
		event.preventDefault();
		console.log("Name: "+this.refs.name);
		Meteor.call("updateSGName", this.props.gid, this.refs.name.value);
		//this.state.value = this.refs.name;
	}

  handleNameChange(event){ // need one of these for each component
    this.setState({name:event.target.value});
  }

  getSG(){
		//console.log(Events.find({_id: this.props.eid}).fetch());
		//return Events.find({_id: this.props.eid}).fetch();
		return Groups.findOne(this.props.gcid);
	}


  render(){
    let sg = this.getSG();

  	if(!sg){
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
