import React, {Component} from 'react';

export default class Checkbox extends Component {
  constructor(){
    super();

    this.state = {

    };
  }

  render() {
		let id = this.props.label.toLowerCase()+"status";
    return(
      <span>
        <input type="checkbox"
          id={id}
          checked={this.props.checked}
          onChange={this.props.onChange} />
				<label htmlFor={id}>{this.props.label}</label>
      </span>

    )
  }
}
