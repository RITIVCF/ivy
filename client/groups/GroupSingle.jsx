import React, {Component} from 'react';
import GroupWorkspace from './GroupWorkspace.jsx';

export default class GroupsSingle extends Component {
  constructor() {
    super();
    this.state = {
      editting: false
    };
  }

  componentDidMount(){
    $('.modal').modal();
    $('select').material_select();
  }

  edit(event){
    event.preventDefault();
    //this.setState({editting: true});
    console.log("Editting");
    var id = "#"+this.props.group._id;
    console.log(id);
    $("#"+this.props.group._id).modal('open');
  }

  close(event){
    event.preventDefault();
    console.log("Closing");
    $("#"+this.props.group._id).modal('close');
  }

  render() {
    return (
      <li>
        <div className="collapsible-header">{this.props.group.name}</div>
        <div className="collapsible-body"><GroupWorkspace group={this.props.group} /></div>
      </li>
      
          )
  }
}
