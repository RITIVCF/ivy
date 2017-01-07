import React, {Component} from 'react';

export default class Checkbox extends Component {
  constructor(){
    super();

    this.state = {

    };
  }

  render() {
    return(
      <span>
        <input type="checkbox"
          id={this.props.label.toLowerCase()+"status"}
          checked={this.props.checked}
          onChange={this.props.onChange} />
        <label htmlFor={this.props.label.toLowerCase()+"status"}>{this.props.label}</label>
      </span>

    )
  }
}
