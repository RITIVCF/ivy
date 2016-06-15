import React, {Component} from 'react';



export default class ChurchURL extends Component {
  updateURL(event){
		event.preventDefault();
		Meteor.call("updateChurchURL", this.props.cid, this.refs.url.value);
		//this.state.value = this.refs.description;
	}

  handleURLChange(event){ // need one of these for each component
    this.setState({url:event.target.value});
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
  	var url = ch.url;

    return(
      <div>
        <label>url</label>
        <input type="text" ref="url" value={url} onBlur={this.updateURL.bind(this)} onChange={this.handleURLChange} />
      </div>
    )
  }
}
