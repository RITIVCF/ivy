import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class LoginWrapper extends TrackerReact(React.Component){
  constructor(props) {
    super(props);

    this.state = {};
  }

  logout(){
    event.preventDefault();
      Meteor.logout();
  }

  render(){
      if (!Meteor.loggingIn() && !Meteor.userId()){
        return(
          <div>
            <a href="/login">Login </a>
            <a href="/signup">Sign-Up</a>
          </div>
      )
        }
      else{
          return(<button type="button" className="btn btn-primary" onClick={this.logout}>Logout</button>)
      }
  }
}
