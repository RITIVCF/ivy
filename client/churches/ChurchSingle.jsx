import React, {Component} from 'react';
import ButtonActive from './components/ButtonActive.jsx';
import ChurchWorkspace from './ChurchesWorkspace.jsx';

export default class ChurchSingle extends Component {
  constructor() {
    super();
    this.state = {
      editting: false
    };
  }

  edit(event){
    event.preventDefault();
    this.setState({editting: true});
  }

  close(event){
    event.preventDefault();
    this.setState({editting: false});
  }

  render() {
    // This area needs styled, so however we need to do it to style
    // it correctly. Review Alex's mock ups and Jeanie's drawings.-->
    /* <div className="panel default">
      <a href={"/churches/workspace/" + this.props.church._id}>
        <div>{this.props.church.name}</div>
        <div>{this.props.church.url}</div>
      </a>
      {this.props.showActiveBtn ?
      <ButtonActive active={this.props.church.active} cid={this.props.church._id} /> : "" }
    </div>

    <button onClick={this.close.bind(this)}>Close Edit</button>
    {/*onMouseLeave={this.close.bind(this)} */

    return (
      <div className="panel panel-default">
        <div className="panel-heading" onClick={this.edit.bind(this)}>
          {this.props.church.name}
        </div>
        {this.state.editting ?
        <div  >
          <button onClick={this.close.bind(this)}>Close</button>
        <ChurchWorkspace ch={this.props.church} />
        </div>
      :
      <div className="panel-body">
        {this.props.church.url}
      </div>}
      </div>

    )
  }
}
