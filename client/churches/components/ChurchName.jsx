import React, {Component} from 'react';



export default class ChurchName extends Component {
  updateName(event){
		event.preventDefault();
		console.log("Name: "+this.refs.name);
		Meteor.call("updateChurchName", this.props.ch._id, this.refs.name.value);
		//this.state.value = this.refs.name;
	}

  handleNameChange(event){ // need one of these for each component
    this.setState({name:event.target.value});
  }



  render(){
    return(
      <div className="form-group">
        <label>Name</label>
        <input type="text"
          className="form-control"
          ref="name"
          value={this.props.ch.name}
          onBlur={this.updateName.bind(this)}
          onChange={this.handleNameChange} />
      </div>
    )
  }
}
