import React, {Component} from 'react';



export default class ChurchURL extends Component {
  updateURL(event){
		event.preventDefault();
		Meteor.call("updateChurchURL", this.props.ch._id, this.refs.url.value);
		//this.state.value = this.refs.description;
	}

  handleURLChange(event){ // need one of these for each component
    this.setState({url:event.target.value});
  }


  render(){
    return(
      <div className="form-group">
        <label>URL</label>
        <input type="text"
          ref="url"
          className="form-control"
          value={this.props.ch.url}
          onBlur={this.updateURL.bind(this)}
          onChange={this.handleURLChange} />
      </div>
    )
  }
}
