import React, {Component} from 'react';



export default class SGName extends Component {
  updateName(event){
		event.preventDefault();
		Meteor.call("updateSGName", this.props.gid, this.refs.name.value);

	}

  handleNameChange(event){ // need one of these for each component
    this.setState({name:event.target.value});
  }

  getSG(){
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
