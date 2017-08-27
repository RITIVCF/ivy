import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class LoginWrapper extends TrackerReact(React.Component){
  constructor(props) {
    super(props);

  }

  logout(){
    event.preventDefault();
    Meteor.logout();
    routeTo("login");
  }

  render(){
    return(<a onClick={this.logout}>Logout</a>)
  }
}
