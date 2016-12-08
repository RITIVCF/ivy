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
    // $('.modal').modal();
    // console.log("Editting");
    // var id = "#"+this.props.group._id;
    // console.log(id);
    // $("#"+this.props.group._id).modal('open');
    Session.set("groupselected",this.props.group._id);
  }

  // close(event){
  //   event.preventDefault();
  //   console.log("Closing");
  //   $("#"+this.props.group._id).modal('close');
  // }

  render() {
    return (
      <div className="col s12 m6 l4">
        <div className={this.props.selected?"card-panel left hoverable addBorderToCard":"card-panel left"}
          style={{width: "100%"}} onClick={this.edit.bind(this)}>
          <div className="card-content">
            <span className="card-title">{this.props.group.name}</span>
          </div>
        </div>
      </div>

          )
  }
}
