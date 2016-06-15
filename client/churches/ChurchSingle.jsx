import React, {Component} from 'react';
import ButtonActive from './components/ButtonActive.jsx';

export default class ChurchSingle extends Component {

  render() {
    // This area needs styled, so however we need to do it to style
    // it correctly. Review Alex's mock ups and Jeanie's drawings.-->

    return (
      <div className="panel default">
        <a href={"/churches/workspace/" + this.props.church._id}>
          <div>{this.props.church.name}</div>
          <div>{this.props.church.url}</div>
        </a>
        {this.props.showActiveBtn ?
        <ButtonActive active={this.props.church.active} cid={this.props.church._id} /> : "" }
      </div>

    )
  }
}
