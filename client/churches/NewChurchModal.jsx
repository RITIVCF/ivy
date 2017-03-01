import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class NewChurchModal extends TrackerReact(React.Component) {
  constructor(){
    super();
    this.state = {
      disabled: true
    }
  }

  componentDidMount(){
    $('.modal').modal();
  }

  open(){
    $("#newchurchmodal").appendTo("body").modal("open");
  }

  check(){
    if(this.refs.name.value==""){
      this.setState({disabled: true});
    }
    else{
      this.setState({disabled: false});
    }
  }

  create(event){
    event.preventDefault();
    Meteor.call('addChurch', this.refs.name.value);
    this.refs.name.value="";
    $('#newchurchmodal').modal("close");
  }

  render() {
    return (
      <div id="newchurchmodal" className="modal">
        <form onSubmit={this.create.bind(this)}>
          <div className="modal-content">
            <div className="row">
              <div className="col s12">
                <div className="input-field">
                  <input type="text" id="name" ref="name" onChange={this.check.bind(this)} />
                  <label htmlFor="name">New Church Name</label>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <a type="submit" disabled={this.state.disabled} className="modal-action modal-close waves-effect waves-light btn-flat">Create</a>
            <a className="modal-action modal-close waves-effect waves-light btn-flat">Close</a>
          </div>
        </form>
      </div>
    )
  }
}
