import React, {Component} from 'react';

export default class SelectOption extends Component {

  render() {
    return (
      <option value={this.props.value}>{this.props.displayvalue}</option>
    )
  }
}
