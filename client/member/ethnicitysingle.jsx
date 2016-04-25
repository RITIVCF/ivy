import React, {Component} from 'react';

export default class EthnicitySingle extends Component {
  render() {
    return (
      <option>{this.props.ethnicity.name}</option>
    )
  }
}
