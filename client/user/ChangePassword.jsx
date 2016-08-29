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
      <div>
        <div className="row">
          <div className="col-sm-3 col-lg-2">
            <nav className="navbar navbar-default navbar-fixed-side">

            </nav>
          </div>
          <div className="col-sm-9 col-lg-10">
            <h1>Change Password</h1>
            <div className="panel panel-info">
              <div className="panel-heading">
              </div>
              <div className="panel-body">
                <div className="form-group">
                  <label>Old Password</label>
                  <input className="form-control" type="password" ref="old" required />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input className="form-control"
                    type="password"
                    ref="new"
                    onChange={this.check.bind(this)} required />
                </div>
                <div className={this.state.match?"form-group has-success":"form-group has-error"} >
                  <label>Confirm New Password</label>
                  <input className="form-control"
                    type="password"
                    ref="confirm"
                    onChange={this.check.bind(this)} required />
                </div>
                <div className="form-group">
                  <button className="btn btn-info"
                    disabled={!this.state.match}
                    onClick={this.submit.bind(this)} >
                    Change
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
	}
}
