import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import MainBox from '../MainBox.jsx';
import EmailContainer from './EmailContainer.jsx'
import LoaderCircle from '../LoaderCircle.jsx';
import NoPerm from '../NoPerm.jsx';

import EmailWorkspacePanel from './EmailWorkspacePanel.jsx';

//Contacts = new Mongo.Collection('contacts');

export default class EmailWorkspaceWrapper extends TrackerReact(React.Component){
  constructor() {
    super();

    this.state = {
      subscription: {
        email: Meteor.subscribe("myEmails")
      }
    };


  }

  componentWillUnmount() {
    this.state.subscription.email.stop();
  }

  toggleInfoBar(){

  }

  getSubHeader(){
    return <ul className="right">
      <li onClick={this.toggleInfoBar.bind(this)}><a>
        <i className="material-icons black-text">add</i></a>
      </li>
    </ul>
  }

  render() {
    if(!this.state.subscription.email.ready()){
      return (<LoaderCircle />)
    }
    if(!checkPermission("emails")){
      return <NoPerm />
    }
    document.title="Ivy - Email Workspace";

    return (
      <MainBox
        content={<EmailContainer />}
        subheader={this.getSubHeader()}
        showinfobar={true}
        infobar={<EmailWorkspacePanel />}
        />
    )
  }
}