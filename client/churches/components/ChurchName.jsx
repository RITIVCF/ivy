import React, {Component} from 'react';



export default class ChurchName extends Component {
  constructor(){
    super();
    this.state = {
      editting: false
    };
  }

  updateName(event){
		event.preventDefault();
		//console.log("Name: "+this.refs.name);
		Meteor.call("updateChurchName", this.props.ch._id, this.refs.name.value);
		//this.state.value = this.refs.name;
    this.setState({editting: !this.state.editting});
	}

  toggleEdit(event){
    this.setState({editting: !this.state.editting});
  }


  render(){
    return(
      <div>
        {!this.state.editting ? <h2>{this.props.ch.name}{(!this.state.editting)&&<i className="tiny material-icons black-text" onClick={this.toggleEdit.bind(this)}>edit</i>}</h2>
    		:<input type="text"
          ref="name"
          defaultValue={this.props.ch.name}
          onBlur={this.updateName.bind(this)}
          />}
        {this.state.edittin&&<a className="btn" style={{marginRight:"5px"}} onClick={this.updateName.bind(this)}>Save</a>}
        {this.state.edittin&&<a className="btn" onClick={this.toggleEdit.bind(this)}>Cancel</a>}

      </div>
    )
  }
}
