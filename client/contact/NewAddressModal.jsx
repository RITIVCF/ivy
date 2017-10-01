import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class NewAddressModal extends TrackerReact(React.Component) {
  constructor(){
    super();

    this.state = {
      createdisabled: true
    }

  }

  createNew(event){
    event.preventDefault();
    this.props.contact.addAddress(
      this.refs.line1.value.trim(),
      this.refs.line2.value.trim(),
      this.refs.line3.value.trim(),
      this.refs.city.value.trim(),
      this.refs.state.value.trim(),
      this.refs.zip.value.trim()
    );
		
		if(this.props.onSubmit){
			this.props.onSubmit();
		}

    this.refs.line1.value="";
    this.refs.line2.value="";
    this.refs.line3.value="";
    this.refs.city.value="";
    this.refs.state.value="";
    this.refs.zip.value="";
}

  checkValue(event){
    if(this.refs.line1.value==""||
        this.refs.city.value==""||
        this.refs.state.value==""||
        this.refs.zip.value==""){
      this.setState({createdisabled: true});
      return;
    }
    this.setState({createdisabled: false});

  }

  render() {
    return (
			<Modal
				open={this.props.open}
				onClose={this.props.onClose}
			>
				<div className="row">
					<form onSubmit={this.createNew.bind(this)}>
						<div className="input-field col s12">
							<input ref="line1" id="line1" type="text" onChange={this.checkValue.bind(this)}  />
							<label htmlFor="icon_prefix">Line 1</label>
						</div>
						<div className="input-field col s12 m6">
							<input ref="line2" id="line2" type="text" onChange={this.checkValue.bind(this)} />
							<label htmlFor="icon_prefix">Line 2</label>
						</div>
						<div className="input-field col s12 m6">
							<input ref="line3" id="line3" type="text" onChange={this.checkValue.bind(this)}  />
							<label htmlFor="icon_prefix">Line 3</label>
						</div>
						<div className="input-field col s12 m6 l4">
							<input ref="city" id="city" type="text" onChange={this.checkValue.bind(this)}  />
							<label htmlFor="icon_prefix">City</label>
						</div>
						<div className="input-field col s12 m6 l4">
							<input ref="state" id="state" type="text" onChange={this.checkValue.bind(this)}  />
							<label htmlFor="icon_prefix">State</label>
						</div>
						<div className="input-field col s12 m6 l4">
							<input ref="zip" id="zip" type="text" onChange={this.checkValue.bind(this)}  />
							<label htmlFor="icon_prefix">ZIP</label>
						</div>
						<input type="submit" style={{visibility:"hidden"}} />
					</form>
				</div>
				<a onClick={this.createNew.bind(this,false)} ref="createevent"
					className={this.state.createdisabled?"btn-flat disabled":
					"btn-flat"}>Create
				</a>
				<a className="btn-flat" onClick={this.props.onClose}>Cancel</a>
			</Modal>
    )
  }
}
