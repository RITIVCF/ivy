import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class NewChurchModal extends TrackerReact(React.Component) {
  constructor(){
    super();

    this.state = {
      disabled: true
    };

		this.close = this.close.bind(this);
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
		this.props.onClose();
  }

	close(){
		this.props.onClose();
	}

  render() {
    return (
      <Modal open={this.props.open} onClose={this.close}>
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
					<button type="submit" disabled={this.state.disabled} className="btn-flat">Create</button>
					<Button onClick={this.close} className="btn-flat">Close</Button>
        </form>
			</Modal>
    )
  }
}
