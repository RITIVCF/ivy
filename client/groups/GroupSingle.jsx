import React, {Component} from 'react';
import GroupWorkspace from './GroupWorkspace.jsx';

export default class GroupsSingle extends Component {
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
    return (
      <div className="panel default">
        {this.state.editting ?
        <div  >
          <button onClick={this.close.bind(this)}>Close</button>
        <GroupWorkspace group={this.props.group} />
        </div>
      :
      <div onClick={this.edit.bind(this)}>
        <div>{this.props.group.name}</div>
      </div>}
      </div>

    )
  }
}
