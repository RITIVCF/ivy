import React, {Component} from 'react';

export default class EthnicitySelect extends Component {
  render() {
    return (
      <option>{this.props.ethnicity.name}</option>
    )
  }
}
