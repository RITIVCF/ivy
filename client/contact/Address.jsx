import React, {Component} from 'react';

export default class Address extends Component {
  constructor() {
    super();

    this.state = {
      editting: false
    };

  }

  edit(event){
    event.preventDefault();
    if(this.props.disabled){
      return;
    }
    this.setState({
      editting: true
    });
  }

  closeedit(event){
    event.preventDefault();
    Meteor.call("updateMailingAddress", this.props.contact._id, this.props.address.line1, this.refs.line1.value, this.refs.line2.value, this.refs.line3.value,
      this.refs.city.value, this.refs.state.value, this.refs.zip.value);
    this.setState({
      editting: false
    });
  }

  close(event){
    event.preventDefault();
    this.setState({
      editting: false
    });
  }

  remove(event){
    event.stopPropagation();
    event.preventDefault();
    Meteor.call("removeMailingAddress", this.props.contact._id, this.props.address.line1);
  }

  handleLine1Change(event){
    this.setState({line1: event.target.value});
  }

  handleLine2Change(event){
    this.setState({line2: event.target.value});
  }

  handleLine3Change(event){
    this.setState({line3: event.target.value});
  }

  handleCityChange(event){
    this.setState({city: event.target.value});
  }

  handleStateChange(event){
    this.setState({state: event.target.value});
  }

  handleZIPChange(event){
    this.setState({ZIP: event.target.value});
  }


  render(){
    return(
      <li className="collection-item" id="showhim">
				{this.state.editting==true ?
					<form>
						<input type="text" ref="line1" value={this.props.address.line1} placeholder="Line 1" onChange={this.handleLine1Change} />
						<input type="text" ref="line2" value={this.props.address.line2} placeholder="Line 2"  onChange={this.handleLine2Change} />
						<input type="text" ref="line3" value={this.props.address.line3} placeholder="Line 3" onChange={this.handleLine3Change} />
						<input type="text" ref="city" value={this.props.address.city} placeholder="City" onChange={this.handleCityChange} />
						<input type="text" ref="state" value={this.props.address.state} placeholder="State" onChange={this.handleStateChange} />
						<input type="text" ref="zip" value={this.props.address.zip} placeholder="ZIP" onChange={this.handleZIPChange} />
						<button onClick={this.closeedit.bind(this)}>Save</button>
						<button onClick={this.close.bind(this)}>Close</button>
					</form>
				:
				<div onClick={this.edit.bind(this)}>
					{!this.props.disabled&&
						<a className="btn right" id="showme" onClick={this.remove.bind(this)}>Remove</a>}
					<div>{this.props.address.line1}</div>
					<div>{this.props.address.line2}</div>
					<div>{this.props.address.line3}</div>
					<div>{this.props.address.city}, {this.props.address.state} {this.props.address.zip}</div>
      </div>
    }

    </li>
    )
  }
}
