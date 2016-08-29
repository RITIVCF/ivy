import React, {Component} from 'react';
import ButtonActive from './components/ButtonActive.jsx';

export default class ChurchSingle extends Component {

  render() {
    // This area needs styled, so however we need to do it to style
    // it correctly. Review Alex's mock ups and Jeanie's drawings.-->

    return (
      <div className="panel default">
        <a href={"/sg/workspace/" + this.props.sg._id}>
          <div>{this.props.sg.name}</div>
          <div>{this.props.sg.url}</div>
        </a>
        {this.props.showActiveBtn ?
        <ButtonActive active={this.props.sg.active} cid={this.props.sg._id} /> : "" }
      </div>

    )
  }
}
