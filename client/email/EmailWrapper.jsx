import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import MainBox from '../MainBox.jsx';
import EmailSummaryPanel from './EmailSummaryPanel.jsx';
import LoaderCircle from '../LoaderCircle.jsx';
import NoPerm from '../NoPerm.jsx';

import EmailSummary from './EmailSummary.jsx';
//Contacts = new Mongo.Collection('contacts');

export default class EmailWrapper extends TrackerReact(React.Component){
  constructor() {
    super();

    this.state = {
      subscription: {
        email: Meteor.subscribe("myEmails")
      },
      panel: false
    };


  }

  componentWillUnmount() {
    this.state.subscription.email.stop();
  }

  toggleInfoBar(){
    this.setState({panel: true});
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
    document.title="Ivy - Emails";

    return (
      <MainBox
        content={<EmailSummary />}
        subheader={this.getSubHeader()}
        showinfobar={this.state.panel}
        infobar={<EmailSummaryPanel />}
        />
    )
  }
}
