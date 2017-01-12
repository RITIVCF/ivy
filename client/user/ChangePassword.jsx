import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';



export default class ChangePassword extends TrackerReact(React.Component) {
  constructor() {
    super();

    this.state = {
      match: false
    };

  }

  check(){
      if(this.refs.new.value==this.refs.confirm.value){
        this.setState({match: true});
      }
      else{
        this.setState({match: false});
      }
  }

  submit(){
    if(this.state.match){
      Accounts.changePassword(this.refs.old.value, this.refs.new.value, function(error){
        if(error){window.alert("Old password incorrect. Please try again.");}
        else{
          window.alert("Success!");
          FlowRouter.go("/");
        }
      });
    }
  }

	render() {
    document.title="Ivy - Change Password";
		return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <div className="card">
              <div className="card-content">
                <span className="card-title">Change Password</span>
                <div className="row">
                <form className="col s12">
                  <div className="input-field col s12">
                    <input type="password" ref="old" required />
                    <label>Old Password</label>
                  </div>
                  <div className="input-field col s12">
                    <input
                      type="password"
                      ref="new"
                      onChange={this.check.bind(this)} required />
                    <label>New Password</label>
                  </div>
                  <div  className="input-field col s12">
                    <input className="validate"
                      type="password"
                      id="pass"
                      ref="confirm"
                      data-error="wrong" data-success="right"
                      onChange={this.check.bind(this)} required />
                    <label htmlFor="pass" >Confirm New Password</label>
                  </div>
                  <a
                    className="btn waves-effect waves-light" name="action"
                    disabled={!this.state.match}
                    onClick={this.submit.bind(this)} >
                    Change
                  </a>
                </form>
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
	}
}
